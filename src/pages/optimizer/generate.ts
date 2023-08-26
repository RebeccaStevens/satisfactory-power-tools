import { assert } from "chai";
import { pipe } from "fp-ts/function";
import { negate, mul } from "uom-ts";

import { useItems, type ResourceItemRateValue } from "~/composables/game-data";
import { energy } from "~/data/special-items";
import {
  type Machine,
  type MegaWatts,
  type QuantityPerMinute,
  type AppliedRecipe,
  type Item,
  isProductionMachine,
  isGeneratorMachine,
} from "~/data/types";
import { type Percentage } from "~/data/types/units/math";
import { pow, toDecimal } from "~/data/types/units/math";
import { assertNever, isNotNull } from "~/utils";

type InputValue = {
  amount: QuantityPerMinute;
  power: MegaWatts;
};

type ReadonlyInputValue = Readonly<InputValue>;

type OutputValue = {
  greaterThan: boolean;
  amount: QuantityPerMinute | MegaWatts;
};

type ReadonlyOutputValue = Readonly<OutputValue>;

type ReadonlyOutputItem = Readonly<{
  item: Item;
}> &
  ReadonlyOutputValue;

type AppliedRecipeSetting = {
  appliedRecipe: AppliedRecipe;
  clockSpeed: Percentage;
};

type ReadonlyAppliedRecipeSetting = Readonly<AppliedRecipeSetting>;

type Constrant = Readonly<[string, string]>;
type Constrants = Readonly<Iterable<Constrant>>;

/**
 * Generate the linear problem.
 */
export function generateLp(
  optimizeFor: Readonly<Item>,
  input: ReadonlyArray<Readonly<ResourceItemRateValue>>,
  output: ReadonlyArray<ReadonlyOutputItem>,
  settings: ReadonlyArray<ReadonlyAppliedRecipeSetting>,
): string {
  const items = useItems();
  const appliedRecipeSettingsByItem = getAppliedRecipeSettingsByItemMap(
    settings,
    items,
  );

  const optimizeForAppliedRecipeSettings =
    appliedRecipeSettingsByItem.get(optimizeFor);
  assert(optimizeForAppliedRecipeSettings !== undefined);

  const problem = getProblem(optimizeForAppliedRecipeSettings, optimizeFor);
  assert(problem !== "");

  const inputByItem = new Map(input.map((value) => [value.item, value]));
  const outputByItem = new Map(output.map((value) => [value.item, value]));
  const recipeIoConstrants = getRecipeIoConstrants(
    items,
    appliedRecipeSettingsByItem,
    outputByItem,
    inputByItem,
  );

  const constrants = [...recipeIoConstrants];

  const ioBounds = settings.map(
    (setting) => `0 <= ${setting.appliedRecipe.id}`,
  );

  const bounds = [...ioBounds, "0 <= power"];

  const lpProblem = `desired: ${problem}`;
  const lpConstrants = [
    ...constrants.map(([id, constant]) => `  ${id}: ${constant}`),
  ].join("\n");
  const lpBounds = bounds.map((bound) => `  ${bound}`).join("\n");

  return `Maximize\n  ${lpProblem}\nSubject To\n${lpConstrants}\nBounds\n${lpBounds}\nEnd`;
}

function getProblem(
  settings: ReadonlySet<ReadonlyAppliedRecipeSetting>,
  optimizeFor: Readonly<Item>,
) {
  return settings
    .values()
    .map((setting) => {
      if (optimizeFor === energy) {
        const value = getPowerDifferential(
          setting.appliedRecipe.producedIn,
          setting.clockSpeed,
        );
        return `${value} ${setting.appliedRecipe.id}`;
      }

      const io = setting.appliedRecipe.inputOutput.get(optimizeFor);
      if (io === undefined) {
        return null;
      }

      return `${io * toDecimal(setting.clockSpeed)} ${
        setting.appliedRecipe.id
      }`;
    })
    .filter(isNotNull)
    .join(" + ");
}

function getRecipeIoConstrants(
  items: ReadonlyArray<Readonly<Item>>,
  appliedRecipeSettingsByItem: ReadonlyMap<
    Readonly<Item>,
    Set<Readonly<AppliedRecipeSetting>>
  >,
  outputByItem: ReadonlyMap<Readonly<Item>, ReadonlyOutputItem>,
  inputByItem: ReadonlyMap<Readonly<Item>, Readonly<ResourceItemRateValue>>,
): Constrants {
  return items
    .values()
    .map((item): Constrant | null => {
      const itemSettings = appliedRecipeSettingsByItem.get(item);
      if (itemSettings === undefined || itemSettings.size === 0) {
        return null;
      }

      const ioRates = [
        ...itemSettings
          .values()
          .map(
            (
              setting,
            ): [AppliedRecipeSetting, QuantityPerMinute | MegaWatts] => {
              if (item === energy) {
                return [
                  setting,
                  getPowerDifferential(
                    setting.appliedRecipe.producedIn,
                    setting.clockSpeed,
                  ),
                ];
              }

              const io = setting.appliedRecipe.inputOutput.get(item);
              assert(io !== undefined);
              return [
                setting,
                mul(io, toDecimal(setting.clockSpeed)) as QuantityPerMinute,
              ];
            },
          ),
      ];

      const inputAmount: QuantityPerMinute | MegaWatts =
        inputByItem.get(item)?.amount ?? (0 as QuantityPerMinute | MegaWatts);

      const excessNeeded: ReadonlyOutputValue = outputByItem.get(item) ?? {
        greaterThan: true,
        amount: 0 as QuantityPerMinute | MegaWatts,
      };

      assert(
        ioRates.length ===
          new Set(ioRates.map(([s]) => s.appliedRecipe.id)).size,
        "Should not contain the same applied recipe multiple times.",
      );

      return [
        item.id,
        `${[
          inputAmount,
          ...ioRates.map(
            ([setting, rate]) => `${rate} ${setting.appliedRecipe.id}`,
          ),
        ].join(" + ")} ${excessNeeded.greaterThan ? ">=" : "<="} ${
          excessNeeded.amount
        }`,
      ];
    })
    .filter(isNotNull);
}

function getAppliedRecipeSettingsByItemMap(
  settings: ReadonlyArray<ReadonlyAppliedRecipeSetting>,
  items: ReadonlyArray<Readonly<Item>>,
): Map<Readonly<Item>, Set<ReadonlyAppliedRecipeSetting>> {
  return new Map(
    items.map((item): [Item, Set<ReadonlyAppliedRecipeSetting>] => {
      const itemRecipes = new Set(
        settings.filter(
          (setting) =>
            (item === energy
              ? getPowerDifferential(
                  setting.appliedRecipe.producedIn,
                  setting.clockSpeed,
                )
              : setting.appliedRecipe.inputOutput.get(item) ?? 0) !== 0,
        ),
      );

      return [item, itemRecipes];
    }),
  );
}

function getPowerDifferential(
  machine: Readonly<Machine>,
  clockSpeed: Percentage,
): MegaWatts {
  if (isProductionMachine(machine)) {
    return pipe(
      toDecimal(clockSpeed),
      pow(machine.powerConsumptionExponent),
      mul(machine.powerConsumption),
      negate,
    );
  }

  if (isGeneratorMachine(machine)) {
    return pipe(toDecimal(clockSpeed), mul(machine.powerProduction));
  }

  assertNever("Unhandled machine type");
}
