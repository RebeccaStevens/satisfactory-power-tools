import type { Recipe } from "~/data/docs/recipes/types";
import type { ResourceNodeExtractorType } from "~/data/map/types";
import type { Ided, Named } from "~/data/types";

/**
 * A machine.
 */
export type Machine =
  | FrackingActivatorMachine
  | FrackingExtractorMachine
  | ItemSinkMachine
  | ManufacturingMachine
  | ManufacturingVariablePowerMachine
  | NodeExtractingMachine
  | PowerProducingMachine
  | VariablePowerProducingMachine;

/**
 * The type of machine.
 */
export const enum MachineType {
  EXTRACTING = "extracting",
  FRACKING_ACTIVATOR = "fracking activator",
  ITEM_SINK = "item sink",
  MANUFACTURING = "manufacturing",
  MANUFACTURING_VARIABLE_POWER = "manufacturing variable power",
  POWER_PRODUCING = "power producing",
  VARIABLE_POWER_PRODUCING = "variable power producing",
}

/**
 * Common of all machines.
 */
export type MachineBase = Ided &
  Named & {
    machineType: MachineType;
    powerConsumption: number;
    powerConsumptionExponent: number;
    efficiencyMultiplier: number;
    canChangePotential: boolean;
    minPotential: number;
    maxPotential: number;
    maxPotentialIncreasePerCrystal: number;
    maxCrystals: number;
  };

/**
 * Common of all manufacturing machines.
 */
export type ManufacturingMachineBase = MachineBase & {
  machineType:
    | MachineType.MANUFACTURING
    | MachineType.MANUFACTURING_VARIABLE_POWER;
};

/**
 * Part manufacturing machine.
 */
export type ManufacturingMachine = ManufacturingMachineBase & {
  machineType: MachineType.MANUFACTURING;
};

/**
 * Manufacturing machine with variable power usage.
 */
export type ManufacturingVariablePowerMachine = ManufacturingMachineBase & {
  machineType: MachineType.MANUFACTURING_VARIABLE_POWER;
  mininumPowerConsumption: number;
  maximumPowerConsumption: number;
};

/**
 * A machine that extracts resources.
 */
export type ExtractingMachineBase = MachineBase & {
  machineType: MachineType.EXTRACTING;
  extractorType: ResourceNodeExtractorType;
};

/**
 * A machine that extracts a resource from a node.
 */
export type NodeExtractingMachine = ExtractingMachineBase;

/**
 * A machine that extracts a resource from a well.
 */
export type FrackingExtractorMachine = ExtractingMachineBase;

/**
 * The base of all machines that produces power.
 */
export type PowerProducingMachineBase = MachineBase & {
  machineType:
    | MachineType.POWER_PRODUCING
    | MachineType.VARIABLE_POWER_PRODUCING;
  powerProduction: number;
  powerProductionExponent: number;
};

/**
 * A machine that produces power.
 */
export type PowerProducingMachine = PowerProducingMachineBase & {
  machineType: MachineType.POWER_PRODUCING;
};

/**
 * A machine that produces variable power.
 */
export type VariablePowerProducingMachine = PowerProducingMachineBase & {
  machineType: MachineType.VARIABLE_POWER_PRODUCING;
  variablePowerProductionConstant: number;
  variablePowerProductionFactor: number;
  variablePowerProductionCycleLength: number;
};

/**
 * A machine that sinks items for points.
 */
export type ItemSinkMachine = MachineBase & {
  machineType: MachineType.ITEM_SINK;
};

/**
 * A used to start fracking.
 */
export type FrackingActivatorMachine = MachineBase & {
  machineType: MachineType.FRACKING_ACTIVATOR;
  extractors: Set<FrackingExtractorMachine>;
};

/**
 * Something that has machine specific recipes.
 */
export type HasMachineRecipes = {
  machineRecipes: Set<MachineRecipe>;
};

/**
 * A recipe provide by raw machine data.
 */
export type MachineRecipe = Omit<Recipe, "canBeProducedIn">;
