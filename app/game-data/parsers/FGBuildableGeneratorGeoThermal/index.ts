import { Effect, pipe } from "effect";

import { MegaWatt, Second, Unitless } from "~/types";

import {
  type AbstractFGBuildableGenerator,
  parseAbstractFGBuildableGenerator,
} from "../abstractFGBuildableGenerator";
import type { ParseError } from "../errors";
import { parseFloat } from "../primitives";

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
          variablePowerProductionConstant: parseFloat(
            data.mVariablePowerProductionConstant,
          ).pipe(Effect.map(Unitless)),
          variablePowerProductionFactor: parseFloat(
            data.mVariablePowerProductionFactor,
          ).pipe(Effect.map(Unitless)),
          variablePowerProductionCycleLength: parseFloat(
            data.mVariablePowerProductionCycleLength,
          ).pipe(Effect.map(Second)),
          minPowerProduction: parseFloat(data.mMinPowerProduction).pipe(
            Effect.map(MegaWatt),
          ),
          maxPowerProduction: parseFloat(data.mMaxPowerProduction).pipe(
            Effect.map(MegaWatt),
          ),
          variablePowerProductionCycleOffset: parseFloat(
            data.mVariablePowerProductionCycleOffset,
          ).pipe(Effect.map(Second)),
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
  variablePowerProductionConstant: Unitless;
  variablePowerProductionFactor: Unitless;
  variablePowerProductionCycleLength: Second;
  minPowerProduction: MegaWatt;
  maxPowerProduction: MegaWatt;
  variablePowerProductionCycleOffset: Second;
};
