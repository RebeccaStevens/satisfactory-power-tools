import { getWells } from "./fracking";
import rawGameData from "./game-data.json" assert { type: "json" };
import { getGeysers } from "./geysers";
import { getItems } from "./items";
import { getMachines } from "./machines";
import { getNodes } from "./nodes";
import { getRecipes } from "./recipes";

const items = getItems(rawGameData.items);
const machines = getMachines(rawGameData.machines);
const recipes = getRecipes(rawGameData.recipes, items, machines);
const nodes = getNodes(rawGameData.nodes, items);
const wells = getWells(rawGameData.wells, items);
const geysers = getGeysers(rawGameData.geysers);

export const gameData = {
  items,
  machines,
  recipes,
  nodes,
  wells,
  geysers,
};
