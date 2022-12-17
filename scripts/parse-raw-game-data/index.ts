import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as url from "node:url";

import "~/polyfills";

import { loadStaticGameData } from "./load";

const gameDataFile = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../../src/data/game-data.json",
);
const staticGameData = loadStaticGameData();

// TODO:
const filteredItems = staticGameData.items;
const filteredMachines = staticGameData.machines;
const filteredRecipes = staticGameData.recipes;

const filteredGameData = {
  items: filteredItems,
  machines: filteredMachines,
  recipes: filteredRecipes,
};

console.log(gameDataFile);

await fsp.writeFile(gameDataFile, JSON.stringify(filteredGameData), {
  encoding: "utf8",
});
