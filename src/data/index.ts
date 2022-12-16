import {
  loadItems,
  loadMachines,
  loadRawGameDataByNativeClass,
  loadRecipes,
} from "./docs";
import { loadMapData } from "./map";
import type { GameData } from "./types";

export {
  type AppliedRecipe,
  type AppliedRecipeBase,
  type AppliedResourceNodeRecipe,
  type AppliedResourceWellRecipe,
  type AppliedSinkRecipe,
  type ItemAmount,
  type PartRecipe,
  type Recipe,
  type RecipeBase,
  type ResourceNodeRecipe,
  type ResourceWellRecipe,
  type SinkRecipe,
} from "./docs/recipes";

export { type GameData as Data, type Ided, type Named } from "./types";

export {
  type FrackingActivatorMachine,
  type FrackingExtractorMachine,
  type ItemSinkMachine,
  type Machine,
  type ManufacturingMachine,
  type ManufacturingVariablePowerMachine,
  type NodeExtractingMachine,
  type PowerProducingMachine,
} from "./docs/machines";

export {
  type Geysers,
  type Purities,
  type Purity,
  type PurityCollection,
  ResourceNodeExtractorType,
  type ResourceNodes,
  type ResourceWell,
  type ResourceWellSatellites,
} from "./map/types";

export {
  type Item,
  type NonPhysicalItem,
  type PartItem,
  type ResourceItem,
} from "./docs/items";

export { ItemType, TransferType } from "./docs/items";

export { MachineType } from "./docs/machines";

export { RecipeType } from "./docs/recipes";
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
