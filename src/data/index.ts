import rawGameData from "./game-data.json" assert { type: "json" };
import { getItems } from "./items";
import { getMachines } from "./machines";
import { getRecipes } from "./recipes";

const items = getItems(rawGameData.items);
const machines = getMachines(rawGameData.machines);
const recipes = getRecipes(rawGameData.recipes, items, machines);

export const gameData = {
  items,
  machines,
  recipes,
};
