import { Array, Effect, pipe } from "effect";

import type { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/generate/parsers/types";
import { upgradeBuildables } from "~/game-data/generate/upgrade/buildables";
import { upgradeBuildings } from "~/game-data/generate/upgrade/buildings";
import { upgradeEquipments } from "~/game-data/generate/upgrade/equipments";
import { upgradeGeneratorFuelMachines } from "~/game-data/generate/upgrade/machines/generators/fuel";
import { upgradeGeneratorGeoThermalMachines } from "~/game-data/generate/upgrade/machines/generators/geo-thermal";
import { upgradeProductionMachines } from "~/game-data/generate/upgrade/machines/production";
import { upgradeSinkMachines } from "~/game-data/generate/upgrade/machines/sinks";
import { upgradeRecipes } from "~/game-data/generate/upgrade/recipes";
import { upgradeSchematics } from "~/game-data/generate/upgrade/schematics";
import { upgradeVehicles } from "~/game-data/generate/upgrade/vehicles";
import type { GameData } from "~/game-data/types";

import { upgradeItems } from "./items";

export function upgradeVendorData(vendorData: VendorData[]): Effect.Effect<GameData, LookupError> {
  const allNativeClasses = new Set(vendorData.map((v) => v.nativeClass));

  const itemsMap = pipe(
    upgradeItems(vendorData),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const machinesMap = pipe(
    Effect.all([
      upgradeProductionMachines(vendorData),
      upgradeGeneratorFuelMachines(vendorData, itemsMap),
      upgradeGeneratorGeoThermalMachines(vendorData),
      upgradeSinkMachines(vendorData),
    ]),
    Effect.map((entriesSets) => new Map(Array.flatten(entriesSets))),
    Effect.runSync,
  );

  const buildablesMap = pipe(
    upgradeBuildables(vendorData),
    Effect.map((entries) => new Map([...entries, ...machinesMap])),
    Effect.runSync,
  );

  const buildingsMap = pipe(
    upgradeBuildings(vendorData, buildablesMap),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const recipesMap = pipe(
    upgradeRecipes(vendorData, itemsMap, machinesMap),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const equipmentsMap = pipe(
    upgradeEquipments(vendorData),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const vehiclesMap = pipe(
    upgradeVehicles(vendorData),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const schematicsMap = pipe(
    upgradeSchematics(vendorData),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const categorizedData = {
    buildables: new Set(buildablesMap.values()),
    buildings: new Set(buildingsMap.values()),
    items: new Set(itemsMap.values()),
    machines: new Set(machinesMap.values()),
    recipes: new Set(recipesMap.values()),
    equipments: new Set(equipmentsMap.values()),
    vehicles: new Set(vehiclesMap.values()),
    schematics: new Set(schematicsMap.values()),
  };

  const allData = new Map(
    Object.values(categorizedData).flatMap((set) =>
      set
        .values()
        .map((v) => [v.className, v] as const)
        .toArray(),
    ),
  );

  const unhandledNativeClasses = allNativeClasses.difference(new Set(allData.values().map((v) => v.nativeClass)));
  if (unhandledNativeClasses.size > 0) {
    return Effect.dieMessage(`Unhandled native classes: \n- ${unhandledNativeClasses.values().toArray().join("\n- ")}`);
  }

  return pipe(
    Effect.succeed({
      classes: allData,
      ...categorizedData,
    }),
    // Remove native class from data.
    Effect.tap(() => {
      // eslint-disable-next-line functional/no-loop-statements
      for (const value of allData.values()) {
        // @ts-expect-error -- Changing type.
        // eslint-disable-next-line functional/immutable-data, functional/no-expression-statements
        delete value.nativeClass;
      }
    }),
  );
}
