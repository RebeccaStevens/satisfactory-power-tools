import { Effect, pipe } from "effect";

import { MegaWatt } from "~/types";

import {
  type FGBuildableManufacturer,
  parseFGBuildableManufacturer,
} from "../FGBuildableManufacturer";
import type { ParseError } from "../errors";
import { parseFloat } from "../primitives";

import { assertVendorFGBuildableManufacturerVariablePower } from "./assert";

export function parseFGBuildableManufacturerVariablePower(
  data: unknown,
): Effect.Effect<FGBuildableManufacturerVariablePower, ParseError> {
  assertVendorFGBuildableManufacturerVariablePower(data);

  return pipe(
    Effect.all([
      parseFGBuildableManufacturer(data),
      pipe(
        Effect.all({
          minimumPowerConsumption: parseFloat(
            data.mEstimatedMininumPowerConsumption,
          ).pipe(Effect.map(MegaWatt)),
          maximumPowerConsumption: parseFloat(
            data.mEstimatedMininumPowerConsumption,
          ).pipe(Effect.map(MegaWatt)),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableManufacturerVariablePower = FGBuildableManufacturer & {
  minimumPowerConsumption: MegaWatt;
  maximumPowerConsumption: MegaWatt;
};
