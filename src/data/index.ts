import {
  loadItems,
  loadMachines,
  loadRawGameDataByNativeClass,
  loadRecipes,
} from "./docs";
import { loadMapData } from "./map";
import type { GameData } from "./types";

/**
 * Load all the game data.
 */
export function loadData(): GameData {
  const rawgamedatabynativeclass = loadRawGameDataByNativeClass();

  const items = loadItems(rawgamedatabynativeclass);
  const machines = loadMachines(rawgamedatabynativeclass, items);

  const recipes = loadRecipes(
    rawgamedatabynativeclass,
    items.byInternalClassName,
    machines.byInternalClassName,
  );

  const { purities, geysers, resourceNodes, resourceWells } = loadMapData(
    items.byId,
  );

  return {
    items: items.byId,
    machines: machines.byId,
    recipes,
    purities,
    geysers,
    resourceNodes,
    resourceWells,
  };
}

export { type GameData as Data, type Ided, type Named } from "./types";
export {
  type Item,
  type NonPhysicalItem,
  type PartItem,
  type ResourceItem,
} from "./docs/items";
export { ItemType, TransferType } from "./docs/items";
export {
  type Machine,
  type ManufacturingMachine,
  type ManufacturingVariablePowerMachine,
  type NodeExtractingMachine,
  type FrackingExtractorMachine,
  type PowerProducingMachine,
  type ItemSinkMachine,
  type FrackingActivatorMachine,
} from "./docs/machines";
export { MachineType } from "./docs/machines";
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
  type AppliedResourceNodeRecipe,
  type AppliedResourceWellRecipe,
  type AppliedSinkRecipe,
} from "./docs/recipes";
export { RecipeType } from "./docs/recipes";
export {
  type Purities,
  type Purity,
  type PurityCollection,
  type ResourceNodes,
  type ResourceWell,
  type ResourceWellSatellites,
  type Geysers,
  ResourceNodeExtractorType,
} from "./map/types";
