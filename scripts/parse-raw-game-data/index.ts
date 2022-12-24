import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as url from "node:url";

import "~/polyfills";

import { getDocsData } from "./docs";
import { getResourcesData } from "./resources";

const gameDataFile = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../../src/data/game-data.json",
);

const { items, machines, recipes, schematics } = getDocsData();
const { nodes, geysers, wells } = getResourcesData();

const gameData = {
  items,
  machines,
  recipes,
  nodes,
  wells,
  geysers,
  schematics,
};

await fsp.writeFile(gameDataFile, JSON.stringify(gameData), {
  encoding: "utf8",
});
