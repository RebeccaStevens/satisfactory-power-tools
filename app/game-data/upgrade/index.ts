import { Array, Effect, pipe } from "effect";

import type { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/parsers/vendorData/types";
import { upgradeBuildables } from "~/game-data/upgrade/buildables";
import { upgradeBuildings } from "~/game-data/upgrade/buildings";
import { upgradeEquipments } from "~/game-data/upgrade/equipments";
import { upgradeGeneratorFuelMachines } from "~/game-data/upgrade/machines/generators/fuel";
import { upgradeGeneratorGeoThermalMachines } from "~/game-data/upgrade/machines/generators/geo-thermal";
import { upgradeProductionMachines } from "~/game-data/upgrade/machines/production";
import { upgradeSinkMachines } from "~/game-data/upgrade/machines/sinks";
import { upgradeRecipes } from "~/game-data/upgrade/recipes";
import { upgradeSchematics } from "~/game-data/upgrade/schematics";
import type {
  Buildable,
  Building,
  Equipment,
  Item,
  Machine,
  Recipe,
  Schematic,
  Vehicle,
} from "~/game-data/upgrade/types";
import { upgradeVehicles } from "~/game-data/upgrade/vehicles";
import type { ClassName } from "~/types";
import { assertEffect } from "~/utils";

import { upgradeItems } from "./items";

export type GameData = {
  classes: Map<
    ClassName,
    /* eslint-disable ts/no-duplicate-type-constituents */
    | Buildable
    | Building
    | Item
    | Machine
    | Recipe
    | Equipment
    | Vehicle
    | Schematic
    /* eslint-enable ts/no-duplicate-type-constituents */
  >;
  classesCategorized: {
    buildables: Map<ClassName, Buildable>;
    buildings: Map<ClassName, Building>;
    items: Map<ClassName, Item>;
    machines: Map<ClassName, Machine>;
    recipes: Map<ClassName, Recipe>;
    equipments: Map<ClassName, Equipment>;
    vehicles: Map<ClassName, Vehicle>;
    schematics: Map<ClassName, Schematic>;
  };
};

export function upgradeVendorData(
  vendorData: VendorData[],
): Effect.Effect<GameData, LookupError> {
  const allNativeClasses = new Set(vendorData.map((v) => v.nativeClass));

  const items = pipe(
    upgradeItems(vendorData),
    Effect.map((entries) => new Map(entries)),
    Effect.orDie,
    Effect.runSync,
  );

  const machines = pipe(
    Effect.all([
      upgradeProductionMachines(vendorData),
      upgradeGeneratorFuelMachines(vendorData, items),
      upgradeGeneratorGeoThermalMachines(vendorData),
      upgradeSinkMachines(vendorData),
    ]),
    Effect.map((entriesSets) => new Map(Array.flatten(entriesSets))),
    Effect.runSync,
  );

  const buildables = pipe(
    upgradeBuildables(vendorData),
    Effect.map((entries) => new Map([...entries, ...machines])),
    Effect.runSync,
  );

  const buildings = pipe(
    upgradeBuildings(vendorData, buildables),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const recipes = pipe(
    upgradeRecipes(vendorData, items, machines),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const equipments = pipe(
    upgradeEquipments(vendorData),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const vehicles = pipe(
    upgradeVehicles(vendorData),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const schematics = pipe(
    upgradeSchematics(vendorData),
    Effect.map((entries) => new Map(entries)),
    Effect.runSync,
  );

  const categorizedData = {
    buildables,
    buildings,
    items,
    machines,
    recipes,
    equipments,
    vehicles,
    schematics,
  };

  const allData = new Map(
    Object.values(categorizedData).flatMap((map) => map.entries().toArray()),
  );

  return assertEffect(
    () => {
      const unhandledNativeClasses = allNativeClasses.difference(
        new Set(allData.values().map((v) => v.nativeClass)),
      );
      if (unhandledNativeClasses.size > 0) {
        return `Unhandled native classes: ${unhandledNativeClasses.values().toArray().join(", ")}`;
      }
      return undefined;
    },

    pipe(
      Effect.succeed({
        classes: allData,
        classesCategorized: categorizedData,
      }),
      Effect.tap(() => {
        // eslint-disable-next-line functional/no-loop-statements
        for (const value of allData.values()) {
          // @ts-expect-error -- Changing type.
          // eslint-disable-next-line functional/immutable-data
          delete value.nativeClass;
        }
      }),
    ),
  );
}
