import { Effect, pipe } from "effect";

import {
  type FGBuildableManufacturer,
  parseFGBuildableManufacturer,
} from "~/game-data/generate/parsers/FGBuildableManufacturer";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

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
          minimumPowerConsumption: parseVendorFloat(data.mEstimatedMininumPowerConsumption),
          maximumPowerConsumption: parseVendorFloat(data.mEstimatedMaximumPowerConsumption),
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
  minimumPowerConsumption: number;
  maximumPowerConsumption: number;
};
