import { Array, Effect, pipe } from "effect";
import * as uom from "effect-uom";
import type { IterableElement } from "type-fest";

import type { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/generate/parsers/types";
import { exclude, upgradeItemAmounts, upgradeMachineReferences } from "~/game-data/generate/upgrade/common";
import type { Item, Machine, Recipe, WithNativeClass } from "~/game-data/generate/upgrade/types";
import { ClassName } from "~/game-data/types";

export function upgradeRecipes(
  vendorData: VendorData[],
  items: Map<ClassName, Item>,
  machines: Map<ClassName, Machine>,
): Effect.Effect<Array<[ClassName, Recipe & WithNativeClass]>, LookupError> {
  const recipeNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGCustomizationRecipe'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof recipeNativeClasses>;
      } => recipeNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.filter<(typeof group.classes)[number]>((vendorBuildable) => !exclude.has(vendorBuildable.className)),
        Array.map(
          (vendorRecipe): Effect.Effect<[ClassName, Recipe & WithNativeClass], LookupError> =>
            pipe(
              Effect.all({
                ingredients: upgradeItemAmounts(vendorRecipe.ingredients, items),
                products: upgradeItemAmounts(vendorRecipe.products, items),
                producedIn: upgradeMachineReferences(vendorRecipe.producedIn, machines),
              }),
              Effect.map(
                (values) =>
                  ({
                    ...values,
                    nativeClass: group.nativeClass,
                    className: ClassName(vendorRecipe.className),
                    displayName: vendorRecipe.displayName,
                    duration: uom.Second(vendorRecipe.duration),
                    producedIn: new Set(values.producedIn),
                    variablePowerConsumptionConstant: vendorRecipe.variablePowerConsumptionConstant,
                    variablePowerConsumptionFactor: vendorRecipe.variablePowerConsumptionFactor,
                  }) satisfies Recipe & WithNativeClass,
              ),
              Effect.map((recipe) => [recipe.className, recipe]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
