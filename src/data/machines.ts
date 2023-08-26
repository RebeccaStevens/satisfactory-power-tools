import { assert } from "chai";

import type RawGameData from "~/data/game-data.json";
import {
  type Decimal,
  type SinkMachine,
  type Building,
  type FluidQuantity,
  type ItemQuantity,
  type MegaWatts,
  type Hertz,
  type Quantity,
  type GeneralItem,
  type GeneratorFuelMachine,
  type GeneratorGeoThermalMachine,
  type ProductionMachine,
  asPotential,
  asItemTransporter,
  belt,
} from "~/data/types";
import { isNotNull } from "~/utils";

type MachinesData = (typeof RawGameData)["machines"];

function parseMachineBase(
  id: string,
  data: Readonly<
    | MachinesData["production"][keyof MachinesData["production"]]
    | MachinesData["generator"]["fuel"][keyof MachinesData["generator"]["fuel"]]
    | MachinesData["generator"]["geoThermal"][keyof MachinesData["generator"]["geoThermal"]]
    | MachinesData["sink"][keyof MachinesData["sink"]]
  >,
  buildings: ReadonlyMap<string, Building>,
) {
  assert(id.startsWith("Build_"));
  const buildingId = `Desc${id.slice(5)}`;
  const building = buildings.get(buildingId);
  assert(building !== undefined);

  const minPotential = asPotential(data.minPotential);
  const maxPotential = asPotential(data.maxPotential);
  const maxPotentialIncreasePerCrystal = asPotential(
    data.maxPotentialIncreasePerCrystal,
  );
  return {
    building,
    minPotential,
    maxPotential,
    maxPotentialIncreasePerCrystal,
  };
}

function getProductionMachineBase(
  id: string,
  data: Readonly<
    | MachinesData["production"][keyof MachinesData["production"]]
    | MachinesData["sink"][keyof MachinesData["sink"]]
  >,
  buildings: ReadonlyMap<string, Building>,
) {
  const powerConsumption = data.powerConsumption as MegaWatts;
  const minPowerConsumption = data.minPowerConsumption as MegaWatts;
  const maxPowerConsumption = data.maxPowerConsumption as MegaWatts;
  const powerConsumptionExponent = data.powerConsumptionExponent as Decimal;

  return {
    ...parseMachineBase(id, data, buildings),
    powerConsumption,
    minPowerConsumption,
    maxPowerConsumption,
    powerConsumptionExponent,
  };
}

export function getProductionMachines(
  rawMachines: Readonly<MachinesData["production"]>,
  buildings: ReadonlyMap<string, Building>,
) {
  return new Map(
    Object.entries(rawMachines).map(
      ([id, data]): [string, ProductionMachine] => {
        const manufacturingSpeed = data.manufacturingSpeed as Hertz;

        return [
          id,
          reactive({
            id,
            ...getProductionMachineBase(id, data, buildings),
            manufacturingSpeed,
          }),
        ];
      },
    ),
  );
}

function getGeneratorBaseMachines(
  id: string,
  data: Readonly<
    | MachinesData["generator"]["fuel"][keyof MachinesData["generator"]["fuel"]]
    | MachinesData["generator"]["geoThermal"][keyof MachinesData["generator"]["geoThermal"]]
  >,
  buildings: ReadonlyMap<string, Building>,
) {
  const powerProduction = data.powerProduction as MegaWatts;

  return {
    ...parseMachineBase(id, data, buildings),
    powerProduction,
  };
}

export function getGeneratorFuelMachines(
  rawMachines: Readonly<MachinesData["generator"]["fuel"]>,
  items: ReadonlyMap<string, GeneralItem>,
  buildings: ReadonlyMap<string, Building>,
) {
  return new Map(
    Object.entries(rawMachines).map(
      ([id, data]): [string, GeneratorFuelMachine] => {
        const fuel = data.fuel
          .map((info) => {
            // TODO: handle biomass (biomass is an abstract class)
            if (info.fuel === "FGItemDescriptorBiomass") {
              return null;
            }

            const fuelItem = items.get(info.fuel);
            assert(
              fuelItem !== undefined,
              `Could not find fuel class: "${info.fuel}"`,
            );

            const supplemental = items.get(info.supplemental) ?? null;
            const byproduct =
              info.byproduct === null
                ? null
                : (assert(info.byproduct.length === 2),
                  [
                    items.get(
                      (assert(typeof info.byproduct[0] === "string"),
                      info.byproduct[0]),
                    ),
                    (assert(typeof info.byproduct[1] === "number"),
                    info.byproduct[1] as ItemQuantity),
                  ] as [GeneralItem | undefined, Quantity]);

            assert(
              byproduct === null || byproduct[0] !== undefined,
              `Could not find byproduct class: "${info.byproduct?.[0]}"`,
            );

            return {
              fuel: fuelItem,
              supplemental,
              byproduct: byproduct as [GeneralItem, Quantity] | null,
            };
          })
          .filter(isNotNull);
        const fuelTransporter = asItemTransporter(data.fuelTransporter);
        const fuelLoadAmount = (data.fuelLoadAmount /
          (fuelTransporter === belt ? 1 : 1000)) as Quantity;
        const supplementalLoadAmount = (data.supplementalLoadAmount /
          1000) as FluidQuantity;
        const { requiresSupplementalResource, supplementalToPowerRatio } = data;

        return [
          id,
          reactive({
            id,
            ...getGeneratorBaseMachines(id, data, buildings),
            fuel,
            fuelLoadAmount,
            fuelTransporter,
            requiresSupplementalResource,
            supplementalLoadAmount,
            supplementalToPowerRatio,
          }),
        ];
      },
    ),
  );
}

export function getGeneratorGeoThermalMachines(
  rawMachines: Readonly<MachinesData["generator"]["geoThermal"]>,
  buildings: ReadonlyMap<string, Building>,
) {
  return new Map(
    Object.entries(rawMachines).map(
      ([id, data]): [string, GeneratorGeoThermalMachine] => {
        return [
          id,
          reactive({ id, ...getGeneratorBaseMachines(id, data, buildings) }),
        ];
      },
    ),
  );
}

export function getSinkMachines(
  rawMachines: Readonly<MachinesData["sink"]>,
  buildings: ReadonlyMap<string, Building>,
) {
  return new Map(
    Object.entries(rawMachines).map(([id, data]): [string, SinkMachine] => {
      return [
        id,
        reactive({
          id,
          ...getProductionMachineBase(id, data, buildings),
        }),
      ];
    }),
  );
}
