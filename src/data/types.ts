import type { Item, Machine, Recipe, ResourceItem } from "./docs";
import type { Geysers, Purities, ResourceNodes, ResourceWell } from "./map";

/**
 * All the loaded data.
 */
export type GameData = {
  items: Map<string, Item>;
  machines: Map<string, Machine>;
  recipes: Map<string, Recipe>;
  purities: Purities;
  geysers: Geysers;
  resourceNodes: Map<ResourceItem, ResourceNodes>;
  resourceWells: Map<ResourceItem, Set<ResourceWell>>;
};

/**
 * Something that has an id.
 */
export type Ided = {
  id: string;
};

/**
 * Something that has a display name.
 */
export type Named = {
  name: string;
};
