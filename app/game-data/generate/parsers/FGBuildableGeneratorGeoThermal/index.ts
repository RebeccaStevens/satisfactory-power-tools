import { Effect, pipe } from "effect";

import {
  type AbstractFGBuildableGenerator,
  parseAbstractFGBuildableGenerator,
} from "~/game-data/generate/parsers/abstract/FGBuildableGenerator";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableGeneratorGeoThermal } from "./assert";

export function parseFGBuildableGeneratorGeoThermal(
  data: unknown,
): Effect.Effect<FGBuildableGeneratorGeoThermal, ParseError> {
  assertVendorFGBuildableGeneratorGeoThermal(data);

  return pipe(
    Effect.all([
      parseAbstractFGBuildableGenerator(data),
      pipe(
        Effect.all({
          variablePowerProductionConstant: parseVendorFloat(data.mVariablePowerProductionConstant),
          variablePowerProductionFactor: parseVendorFloat(data.mVariablePowerProductionFactor),
          variablePowerProductionCycleLength: parseVendorFloat(data.mVariablePowerProductionCycleLength),
          minPowerProduction: parseVendorFloat(data.mMinPowerProduction),
          maxPowerProduction: parseVendorFloat(data.mMaxPowerProduction),
          variablePowerProductionCycleOffset: parseVendorFloat(data.mVariablePowerProductionCycleOffset),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableGeneratorGeoThermal = AbstractFGBuildableGenerator & {
  minPowerProduction: number;
  maxPowerProduction: number;
  variablePowerProductionConstant: number;
  variablePowerProductionFactor: number;
  variablePowerProductionCycleLength: number;
  variablePowerProductionCycleOffset: number;
};
