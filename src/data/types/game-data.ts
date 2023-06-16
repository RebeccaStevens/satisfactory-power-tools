import { type Item, type Machine, type Recipe } from "~/data/types";

export type GameData = {
  items: Map<string, Item>;
  machines: Map<string, Machine>;
  recipes: Map<string, Recipe>;
};
