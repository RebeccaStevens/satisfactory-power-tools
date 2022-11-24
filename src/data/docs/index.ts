import assert from "node:assert/strict";

import { pipeSync, concat, filter, flatMap, map } from "iter-ops";

import docsJsonData from "~/data/raw/docs.json" assert { type: "json" };
import { isObject } from "~/utils";

import type { Item } from "./items";
import { getNonPhysicalItems, parseItems } from "./items";
import type { Machine } from "./machines";
import { hasMachineRecipes, parseMachines } from "./machines";
import type { Recipe } from "./recipes";
import { parseRecipes } from "./recipes";

/**
 * Group the raw data class data by their native class name.
 */
export function loadRawGameDataByNativeClass() {
  return new Map(
    docsJsonData.map((group): [string, ReadonlyArray<unknown>] => {
      assert(
        isObject(group) &&
          Object.hasOwn(group, "NativeClass") &&
          typeof group.NativeClass === "string" &&
          Object.hasOwn(group, "Classes") &&
          Array.isArray(group.Classes),
      );
      return [group.NativeClass, group.Classes];
    }),
  );
}

/**
 * Load all the items from the raw data.
 */
export function loadItems(
  rawGameDataByNativeClass: ReadonlyMap<string, ReadonlyArray<unknown>>,
) {
  const byInternalClassName = parseItems(rawGameDataByNativeClass);

  const nonPhysicalItems = getNonPhysicalItems();

  const byId = new Map(
    pipeSync(
      [],
      concat(byInternalClassName.values(), nonPhysicalItems),
      map((item): [string, Item] => [item.id, item]),
    ),
  );

  return {
    byInternalClassName,
    byId,
  };
}

/**
 * Load all the machines from the raw data.
 */
export function loadMachines(
  rawGameDataByNativeClass: ReadonlyMap<string, ReadonlyArray<unknown>>,
  items: Readonly<{
    byInternalClassName: ReadonlyMap<string, Item>;
    byId: ReadonlyMap<Item["id"], Item>;
  }>,
) {
  const byInternalClassName = parseMachines(rawGameDataByNativeClass, items);
  const byId = new Map(
    pipeSync(
      byInternalClassName.values(),
      map((machine): [string, Machine] => [machine.id, machine]),
    ),
  );

  return {
    byInternalClassName,
    byId,
  };
}

/**
 * Load all the recipes from the raw data.
 */
export function loadRecipes(
  rawGameDataByNativeClass: ReadonlyMap<string, ReadonlyArray<unknown>>,
  itemsByInternalClassName: ReadonlyMap<string, Item>,
  machinesByInternalClassName: ReadonlyMap<string, Machine>,
) {
  const baseRecipes = parseRecipes(
    rawGameDataByNativeClass,
    itemsByInternalClassName,
    machinesByInternalClassName,
  );

  const machineRecipes = pipeSync(
    machinesByInternalClassName.values(),
    filter(hasMachineRecipes),
    flatMap((machineWithRecipes) =>
      pipeSync(
        machineWithRecipes.machineRecipes.values(),
        map((recipe): [Recipe["id"], Recipe] => [
          recipe.id,
          { ...recipe, canBeProducedIn: new Set([machineWithRecipes]) },
        ]),
      ),
    ),
  );

  return new Map(pipeSync([], concat(baseRecipes, machineRecipes)));
}

export {
  type Item,
  type NonPhysicalItem,
  type PartItem,
  type ResourceItem,
} from "./items";
export { ItemType, TransferType } from "./items";
export {
  type Machine,
  type ManufacturingMachine,
  type ManufacturingVariablePowerMachine,
  type NodeExtractingMachine,
  type FrackingExtractorMachine,
  type PowerProducingMachine,
  type ItemSinkMachine,
  type FrackingActivatorMachine,
} from "./machines";
export { MachineType } from "./machines";
export {
  type ItemAmount,
  type Recipe,
  type RecipeBase,
  type PartRecipe,
  type ResourceNodeRecipe,
  type ResourceWellRecipe,
  type SinkRecipe,
  type AppliedRecipe,
  type AppliedRecipeBase,
  type AppliedPartRecipe,
  type AppliedResourceNodeRecipe,
  type AppliedResourceWellRecipe,
  type AppliedSinkRecipe,
} from "./recipes";
export { RecipeType } from "./recipes";
