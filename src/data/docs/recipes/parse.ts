import assert from "node:assert/strict";

import { pipeSync, filter, map, flatMap, every } from "iter-ops";

import { type Item, ItemType } from "~/data/docs/items/types";
import { type Machine, MachineType } from "~/data/docs/machines/types";
import { parseRawCollection } from "~/data/docs/raw-collection-parser";
import { isRawBase } from "~/data/docs/raw-types";
import {
  getResourceNodeExtractorType,
  getSimpleInternalClassName,
  parseBase,
} from "~/data/docs/utils";
import { isNotNull, isObject } from "~/utils";

import type { RawRecipe } from "./raw-types";
import { isRawRecipe } from "./raw-types";
import type { ItemAmount, Recipe } from "./types";
import { RecipeType } from "./types";

/**
 * Parse the recipes out of the raw data.
 */
export function parseRecipes(
  rawData: ReadonlyMap<string, ReadonlyArray<unknown>>,
  itemsByInternalClassName: ReadonlyMap<string, Item>,
  machinesByInternalClassName: ReadonlyMap<string, Machine>,
): Map<Recipe["id"], Recipe> {
  const nativeClass = "Class'/Script/FactoryGame.FGRecipe'";
  const rawClassesData = rawData.get(nativeClass);
  assert(rawClassesData !== undefined);

  return new Map(
    rawClassesData
      .map((rawClassData) => {
        assert(
          isObject(rawClassData) &&
            isRawBase(rawClassData) &&
            isRawRecipe(rawClassData),
        );

        return parseRecipe(
          rawClassData,
          machinesByInternalClassName,
          itemsByInternalClassName,
        );
      })
      .map((recipe) => [recipe.id, recipe]),
  );
}

/**
 * Parse a recipe out of the raw data.
 */
function parseRecipe(
  rawData: Readonly<RawRecipe>,
  machinesByInternalClassName: ReadonlyMap<string, Machine>,
  itemsByInternalClassName: ReadonlyMap<string, Item>,
): Recipe {
  const base = parseBase(rawData, "recipe");

  const parseRawIo = getParseRawIoFunction(itemsByInternalClassName);

  const rawIngredients = parseRawCollection(rawData.mIngredients);
  assert(rawIngredients instanceof Set);

  const statedIngredientAmounts = new Map(
    pipeSync(rawIngredients, map(parseRawIo), filter(isNotNull)),
  );

  const rawProducts = parseRawCollection(rawData.mProduct);
  assert(rawProducts instanceof Set);

  const productAmounts = new Map(
    pipeSync(rawProducts, map(parseRawIo), filter(isNotNull)),
  );

  const isResourceRecipe =
    pipeSync(
      statedIngredientAmounts,
      every(
        ([item, { amount }]) =>
          item.itemType === ItemType.RESOURCE &&
          productAmounts.get(item)?.amount === amount,
      ),
    ).first === true;

  const ingredientAmounts = isResourceRecipe
    ? new Map<Item, ItemAmount>()
    : statedIngredientAmounts;

  const rawProducedIn =
    rawData.mProducedIn.length === 0
      ? new Set()
      : parseRawCollection(rawData.mProducedIn);
  assert(rawProducedIn instanceof Set);

  const extractingMachines = isResourceRecipe
    ? pipeSync(
        machinesByInternalClassName.values(),
        filter((machine) => machine.machineType === MachineType.EXTRACTING),
      )
    : null;

  const canBeProducedIn = new Set(
    pipeSync(
      rawProducedIn,
      // TODO: The solver should be what filters out manual machines.
      filter(filterOutManualMachines),
      flatMap((machineInternalClassName) => {
        assert(typeof machineInternalClassName === "string");

        if (isResourceRecipe) {
          const resource = [...productAmounts.keys()][0];
          assert(resource?.itemType === ItemType.RESOURCE);

          const extractorTypeNeeded = getResourceNodeExtractorType(resource);

          if (extractorTypeNeeded === null) {
            return [];
          }

          assert(extractingMachines !== null);
          return pipeSync(
            extractingMachines,
            filter(
              (machine) =>
                machine.machineType === MachineType.EXTRACTING &&
                machine.extractorType === extractorTypeNeeded,
            ),
          );
        }

        const simpleMachineInternalClassName = getSimpleInternalClassName(
          machineInternalClassName,
        );
        const machine = machinesByInternalClassName.get(
          simpleMachineInternalClassName,
        );
        assert(machine !== undefined);

        return [machine];
      }),
    ),
  );

  const duration = Number.parseFloat(rawData.mManufactoringDuration);
  const variablePowerConsumptionConstant = Number.parseFloat(
    rawData.mVariablePowerConsumptionConstant,
  );
  const variablePowerConsumptionFactor = Number.parseFloat(
    rawData.mVariablePowerConsumptionFactor,
  );

  assert(Number.isFinite(duration));
  assert(Number.isFinite(variablePowerConsumptionConstant));
  assert(Number.isFinite(variablePowerConsumptionFactor));

  const alternateNamePrefix = "alternate: ";
  const alternate = base.name
    .toLocaleLowerCase()
    .startsWith(alternateNamePrefix);
  const name = alternate
    ? base.name.slice(alternateNamePrefix.length)
    : base.name;

  const recipeType =
    productAmounts.size > 0 &&
    pipeSync(
      ingredientAmounts.keys(),
      every((item) => item.itemType === ItemType.NON_PHYSICAL),
    ).first === true &&
    pipeSync(
      productAmounts.keys(),
      every((item) => item.itemType === ItemType.RESOURCE),
    ).first === true
      ? rawData.ClassName === "Build_FrackingSmasher_C"
        ? RecipeType.RESOURCE_WELL
        : RecipeType.RESOURCE_NODE
      : RecipeType.PART;

  return {
    ...base,
    name,
    recipeType,
    alternate,
    ingredientAmounts,
    productAmounts,
    duration,
    canBeProducedIn,
    variablePowerConsumptionConstant,
    variablePowerConsumptionFactor,
  };
}

/**
 * Get a function that can parse raw input and output data of a recipe.
 */
function getParseRawIoFunction(
  itemsByInternalClassName: ReadonlyMap<string, Item>,
): (rawItemAmount: unknown) => [Item, ItemAmount] | null {
  return (rawItemAmount) => {
    assert(rawItemAmount instanceof Map);

    const itemInternalClassName: unknown = rawItemAmount.get("ItemClass");
    const rawAmount: unknown = rawItemAmount.get("Amount");

    assert(typeof itemInternalClassName === "string");
    assert(typeof rawAmount === "string");

    const amount = Number.parseFloat(rawAmount);
    assert(Number.isFinite(amount));

    const simpleItemInternalClassName = getSimpleInternalClassName(
      itemInternalClassName,
    );

    const item = itemsByInternalClassName.get(simpleItemInternalClassName);

    if (item === undefined) {
      return null;
    }

    return [item, { item, amount }];
  };
}

/**
 * Filter out all the machines that cannot be automated.
 */
function filterOutManualMachines(machineInternalClassName: unknown): boolean {
  assert(typeof machineInternalClassName === "string");

  return ![
    "/Game/FactoryGame/Buildable/-Shared/WorkBench/BP_WorkBenchComponent.BP_WorkBenchComponent_C",
    "/Game/FactoryGame/Buildable/-Shared/WorkBench/BP_WorkshopComponent.BP_WorkshopComponent_C",
    "/Game/FactoryGame/Buildable/Factory/AutomatedWorkBench/Build_AutomatedWorkBench.Build_AutomatedWorkBench_C",
    "/Game/FactoryGame/Equipment/BuildGun/BP_BuildGun.BP_BuildGun_C",
    "/Script/FactoryGame.FGBuildableAutomatedWorkBench",
    "/Script/FactoryGame.FGBuildGun",
  ].includes(machineInternalClassName);
}
