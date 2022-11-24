import type { Item } from "~/data/docs/items/types";
import type { Machine } from "~/data/docs/machines/types";
import type { Purity, ResourceWell } from "~/data/map/types";
import type { Ided, Named } from "~/data/types";

/**
 * An amount of a specific item.
 */
export type ItemAmount = {
  item: Item;
  amount: number;
};

/**
 * The type of recipe.
 */
export const enum RecipeType {
  RESOURCE_NODE = "extract resource node",
  RESOURCE_WELL = "extract resource well",
  SINK = "sink",
  GEOTHERMAL_POWER = "geothermal power",
  PART = "manufacturing",
}

export type Recipe =
  | ResourceNodeRecipe
  | ResourceWellRecipe
  | SinkRecipe
  | GeothermalPowerRecipe
  | PartRecipe;

/**
 * A recipe.
 */
export type RecipeBase = Ided &
  Named & {
    recipeType: RecipeType;
    alternate: boolean;
    ingredientAmounts: Map<Item, ItemAmount>;
    productAmounts: Map<Item, ItemAmount>;
    duration: number;
    canBeProducedIn: Set<Machine>;
    variablePowerConsumptionConstant: number;
    variablePowerConsumptionFactor: number;
  };

/**
 * A part recipe.
 */
export type PartRecipe = RecipeBase & {
  recipeType: RecipeType.PART;
};

/**
 * A resource node extraction recipe.
 */
export type ResourceNodeRecipe = RecipeBase & {
  recipeType: RecipeType.RESOURCE_NODE;
};

/**
 * A geothermal power recipe.
 */
export type GeothermalPowerRecipe = RecipeBase & {
  recipeType: RecipeType.GEOTHERMAL_POWER;
};

/**
 * A resource well extraction recipe.
 */
export type ResourceWellRecipe = RecipeBase & {
  recipeType: RecipeType.RESOURCE_WELL;
};

/**
 * A recipe that sinks an item.
 */
export type SinkRecipe = RecipeBase & {
  recipeType: RecipeType.SINK;
};

/**
 * A recipe applied to a machine.
 */
export type AppliedRecipe =
  | AppliedResourceNodeRecipe
  | AppliedResourceWellRecipe
  | AppliedGeothermalPowerRecipe
  | AppliedSinkRecipe
  | AppliedPartRecipe;

/**
 * The base of all recipes applied to a machine.
 */
export type AppliedRecipeBase = Omit<RecipeBase, "canBeProducedIn"> & {
  recipeType: RecipeType;
  overclock: number;
  machine: Machine;
  efficiencyMultiplier: number;
  netPower: number;
};

/**
 * A part recipe applied to a machine.
 */
export type AppliedPartRecipe = AppliedRecipeBase & {
  recipeType: PartRecipe["recipeType"];
};

/**
 * A resource node extraction recipe applied to a machine.
 */
export type AppliedResourceNodeRecipe = AppliedRecipeBase & {
  recipeType: ResourceNodeRecipe["recipeType"];
  purity: Purity;
};

/**
 * A resource node extraction recipe applied to a machine.
 */
export type AppliedGeothermalPowerRecipe = AppliedRecipeBase & {
  recipeType: GeothermalPowerRecipe["recipeType"];
  purity: Purity;
};

/**
 * A resource well extraction recipe applied to a machine.
 */
export type AppliedResourceWellRecipe = AppliedRecipeBase & {
  recipeType: ResourceWellRecipe["recipeType"];
  resourceWell: ResourceWell;
};

/**
 * A sink recipe applied to a machine.
 */
export type AppliedSinkRecipe = AppliedRecipeBase & {
  recipeType: SinkRecipe["recipeType"];
};
