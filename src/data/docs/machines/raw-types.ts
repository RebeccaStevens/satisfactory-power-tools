import type { RawBase } from "~/data/docs/raw-types";

export type RawMachineBase = RawBase & {
  mManufacturingSpeed: string;
  mPowerConsumption: string;
  mPowerConsumptionExponent: string;
  mCanChangePotential: string;
  mMinPotential: string;
  mMaxPotential: string;
  mMaxPotentialIncreasePerCrystal: string;
};

/**
 * Type guard for raw machine base data.
 */
export function isRawMachineBase<T extends RawBase>(
  rawData: T,
): rawData is RawMachineBase & T {
  return (
    Object.hasOwn(rawData, "mPowerConsumption") &&
    typeof rawData.mPowerConsumption === "string" &&
    Object.hasOwn(rawData, "mPowerConsumptionExponent") &&
    typeof rawData.mPowerConsumptionExponent === "string" &&
    Object.hasOwn(rawData, "mMinPotential") &&
    typeof rawData.mMinPotential === "string" &&
    Object.hasOwn(rawData, "mMaxPotential") &&
    typeof rawData.mMaxPotential === "string" &&
    Object.hasOwn(rawData, "mMaxPotentialIncreasePerCrystal") &&
    typeof rawData.mMaxPotentialIncreasePerCrystal === "string"
  );
}

export type RawManufacturingMachine = RawMachineBase & {
  mManufacturingSpeed: string;
};

/**
 * Type guard for raw manufacturing machine data.
 */
export function isRawManufacturingMachine<T extends RawMachineBase>(
  rawData: T,
): rawData is RawManufacturingMachine & T {
  return (
    Object.hasOwn(rawData, "mManufacturingSpeed") &&
    typeof rawData.mManufacturingSpeed === "string"
  );
}

export type RawManufacturingVariablePowerMachine = RawManufacturingMachine & {
  mEstimatedMininumPowerConsumption: string;
  mEstimatedMaximumPowerConsumption: string;
};

/**
 * Type guard for raw variable power manufacturing machine data.
 */
export function isRawManufacturingVariablePowerMachine<
  T extends RawManufacturingMachine,
>(rawData: T): rawData is RawManufacturingVariablePowerMachine & T {
  return (
    Object.hasOwn(rawData, "mEstimatedMininumPowerConsumption") &&
    typeof rawData.mEstimatedMininumPowerConsumption === "string" &&
    Object.hasOwn(rawData, "mEstimatedMaximumPowerConsumption") &&
    typeof rawData.mEstimatedMaximumPowerConsumption === "string"
  );
}

export type RawExtractingMachine = RawMachineBase & {
  mExtractorTypeName: string;
  mAllowedResources: string;
  mExtractCycleTime: string;
  mItemsPerCycle: string;
};

/**
 * Type guard for raw extracting machine data.
 */
export function isRawExtractingMachine<T extends RawMachineBase>(
  rawData: T,
): rawData is RawExtractingMachine & T {
  return (
    Object.hasOwn(rawData, "mExtractorTypeName") &&
    typeof rawData.mExtractorTypeName === "string" &&
    Object.hasOwn(rawData, "mAllowedResources") &&
    typeof rawData.mAllowedResources === "string" &&
    Object.hasOwn(rawData, "mExtractCycleTime") &&
    typeof rawData.mExtractCycleTime === "string" &&
    Object.hasOwn(rawData, "mItemsPerCycle") &&
    typeof rawData.mItemsPerCycle === "string"
  );
}

export type RawPowerProducingMachineBase = RawMachineBase & {
  mPowerProduction: string;
  mPowerProductionExponent: string;
};

/**
 * Type guard for raw power producing machine base data.
 */
export function isRawPowerProducingMachineBase<T extends RawMachineBase>(
  rawData: T,
): rawData is RawPowerProducingMachineBase & T {
  return (
    Object.hasOwn(rawData, "mPowerProduction") &&
    typeof rawData.mPowerProduction === "string" &&
    Object.hasOwn(rawData, "mPowerProductionExponent") &&
    typeof rawData.mPowerProductionExponent === "string"
  );
}

export type RawPowerProducingMachine = RawMachineBase &
  RawPowerProducingMachineBase & {
    mFuel: ReadonlyArray<{
      mFuelClass: string;
      mSupplementalResourceClass: string;
      mByproduct: string;
      mByproductAmount: string;
    }>;
    mFuelLoadAmount: string;
    mRequiresSupplementalResource: string;
    mSupplementalLoadAmount: string;
  };

/**
 * Type guard for raw power producing machine data.
 */
export function isRawPowerProducingMachine<T extends RawMachineBase>(
  rawData: T,
): rawData is RawPowerProducingMachine & T {
  return (
    isRawPowerProducingMachineBase(rawData) &&
    Object.hasOwn(rawData, "mFuel") &&
    Array.isArray(rawData.mFuel) &&
    rawData.mFuel.every(
      (fuel) =>
        Object.hasOwn(fuel, "mFuelClass") &&
        typeof fuel.mFuelClass === "string" &&
        Object.hasOwn(fuel, "mSupplementalResourceClass") &&
        typeof fuel.mSupplementalResourceClass === "string" &&
        Object.hasOwn(fuel, "mByproduct") &&
        typeof fuel.mByproduct === "string" &&
        Object.hasOwn(fuel, "mByproductAmount") &&
        typeof fuel.mByproductAmount === "string",
    ) &&
    Object.hasOwn(rawData, "mFuelLoadAmount") &&
    typeof rawData.mFuelLoadAmount === "string" &&
    Object.hasOwn(rawData, "mRequiresSupplementalResource") &&
    typeof rawData.mRequiresSupplementalResource === "string" &&
    Object.hasOwn(rawData, "mSupplementalLoadAmount") &&
    typeof rawData.mSupplementalLoadAmount === "string"
  );
}

export type RawVariablePowerProducingMachine = RawPowerProducingMachine &
  RawPowerProducingMachineBase & {
    mVariablePowerProductionConstant: string;
    mVariablePowerProductionFactor: string;
    mVariablePowerProductionCycleLength: string;
  };

/**
 * Type guard for raw variable power producing machine data.
 */
export function isRawVariablePowerProducingMachine<T extends RawMachineBase>(
  rawData: T,
): rawData is RawVariablePowerProducingMachine & T {
  return (
    isRawPowerProducingMachineBase(rawData) &&
    Object.hasOwn(rawData, "mVariablePowerProductionConstant") &&
    typeof rawData.mVariablePowerProductionConstant === "string" &&
    Object.hasOwn(rawData, "mVariablePowerProductionFactor") &&
    typeof rawData.mVariablePowerProductionFactor === "string" &&
    Object.hasOwn(rawData, "mVariablePowerProductionCycleLength") &&
    typeof rawData.mVariablePowerProductionCycleLength === "string"
  );
}

export type RawItemSinkMachine = RawMachineBase;

/**
 * Type guard for raw item sink machine data.
 */
export function isRawItemSinkMachine<T extends RawMachineBase>(
  rawData: T,
): rawData is RawItemSinkMachine & T {
  return true;
}

export type RawFrackingActivatorMachine = RawMachineBase;

/**
 * Type guard for raw well activating machine data.
 */
export function isRawFrackingActivatorMachine<T extends RawMachineBase>(
  rawData: T,
): rawData is RawFrackingActivatorMachine & T {
  return true;
}
