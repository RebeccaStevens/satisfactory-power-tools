import { getBuildings } from "./buildings";
import { getWells } from "./fracking";
import rawGameData from "./game-data.json";
import { getGeysers } from "./geysers";
import { getItems } from "./items";
import {
  getProductionMachines,
  getGeneratorFuelMachines,
  getGeneratorGeoThermalMachines,
  getSinkMachines,
} from "./machines";
import { getNodes } from "./nodes";
import { getRecipes } from "./recipes";
import { specialItems } from "./special-items";
import { type Idable } from "./types";

const items = getItems(rawGameData.items);
const buildings = getBuildings(rawGameData.buildings);
const machines = {
  production: getProductionMachines(rawGameData.machines.production, buildings),
  generator: {
    fuel: getGeneratorFuelMachines(
      rawGameData.machines.generator.fuel,
      items,
      buildings,
    ),
    geoThermal: getGeneratorGeoThermalMachines(
      rawGameData.machines.generator.geoThermal,
      buildings,
    ),
  },
  sink: getSinkMachines(rawGameData.machines.sink, buildings),
};
const producers = new Map<string, Idable>([
  ...machines.production.entries(),
  ...machines.generator.fuel.entries(),
  ...machines.generator.geoThermal.entries(),
]);
const recipes = getRecipes(rawGameData.recipes, items, producers);
const nodes = getNodes(rawGameData.nodes, items);
const wells = getWells(rawGameData.wells, items);
const geysers = getGeysers(rawGameData.geysers);

export const gameData = {
  items,
  specialItems,
  buildings,
  machines,
  recipes,
  nodes,
  wells,
  geysers,
};

/**
 * Information about the game.
 */
export const gameInfo = {
  tiers: {
    /** The number of tiers in the game. */
    count: 8,
  },
};
