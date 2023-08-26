import {
  type Decimal,
  type Building,
  type ItemTransporter,
  type Idable,
  type Quantity,
  type GeneralItem,
  type Hertz,
  type MegaWatts,
  type Potential,
} from "~/data/types";

export type Machine = Idable & {
  building: Building;
  minPotential: Potential;
  maxPotential: Potential;
  maxPotentialIncreasePerCrystal: Potential;
};

export function isMachine(idable: Readonly<Idable>): idable is Machine {
  return "maxPotential" in idable;
}

export type ProductionMachineBase = Machine & {
  powerConsumption: MegaWatts;
  minPowerConsumption: MegaWatts;
  maxPowerConsumption: MegaWatts;
  powerConsumptionExponent: Decimal;
};

export type ProductionMachine = ProductionMachineBase & {
  manufacturingSpeed: Hertz;
};

export function isProductionMachine(
  idable: Readonly<Idable>,
): idable is ProductionMachine {
  return isMachine(idable) && "powerConsumption" in idable;
}

export type GeneratorMachineBase = Machine & {
  powerProduction: MegaWatts;
};

export function isGeneratorMachine(
  idable: Readonly<Idable>,
): idable is GeneratorMachineBase {
  return isMachine(idable) && "powerProduction" in idable;
}

export type GeneratorFuelMachine = GeneratorMachineBase & {
  fuel: Array<{
    fuel: GeneralItem;
    supplemental: GeneralItem | null;
    byproduct: [GeneralItem, Quantity] | null;
  }>;
  fuelLoadAmount: Quantity;
  fuelTransporter: ItemTransporter;
  requiresSupplementalResource: boolean;
  supplementalLoadAmount: Quantity;
  supplementalToPowerRatio: number;
};

export function isGeneratorFuelMachine(
  idable: Readonly<Idable>,
): idable is GeneratorFuelMachine {
  return isGeneratorMachine(idable) && "fuel" in idable;
}

export type GeneratorGeoThermalMachine = GeneratorMachineBase & {};

export type SinkMachine = ProductionMachineBase;

export function isResourceSinkMachine(
  idable: Readonly<Idable>,
): idable is SinkMachine {
  return isMachine(idable) && "powerConsumption" in idable;
}
