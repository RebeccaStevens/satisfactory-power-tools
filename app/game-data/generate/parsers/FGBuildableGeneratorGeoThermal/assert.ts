import { assert } from "chai";

import {
  type VendorAbstractFGBuildableGenerator,
  assertVendorAbstractFGBuildableGenerator,
} from "~/game-data/generate/parsers/abstract/FGBuildableGenerator/assert";

export function assertVendorFGBuildableGeneratorGeoThermal(
  data: unknown,
): asserts data is VendorFGBuildableGeneratorGeoThermal {
  assertVendorAbstractFGBuildableGenerator(data);
  assert.isEmpty(
    [
      "mProductionEffectsRunning",
      "mVariablePowerProductionConstant",
      "mVariablePowerProductionFactor",
      "mVariablePowerProductionCycleLength",
      "mMinPowerProduction",
      "mMaxPowerProduction",
      "mVariablePowerProductionCycleOffset",
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGBuildableGeneratorGeoThermal",
  );
}

export type VendorFGBuildableGeneratorGeoThermal = VendorAbstractFGBuildableGenerator & {
  mProductionEffectsRunning: string;
  mVariablePowerProductionConstant: string;
  mVariablePowerProductionFactor: string;
  mVariablePowerProductionCycleLength: string;
  mMinPowerProduction: string;
  mMaxPowerProduction: string;
  mVariablePowerProductionCycleOffset: string;
};
