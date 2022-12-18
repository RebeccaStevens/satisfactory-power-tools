import type { Item, Machine, Recipe } from "~/data/types";

export type GameData = {
  items: Map<string, Item>;
  machines: Map<string, Machine>;
  recipes: Map<string, Recipe>;
};
