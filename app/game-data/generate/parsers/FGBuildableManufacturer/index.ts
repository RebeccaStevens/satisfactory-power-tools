import { Effect, pipe } from "effect";

import { type FGBuildableFactory, parseFGBuildableFactory } from "~/game-data/generate/parsers/FGBuildableFactory";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableManufacturer } from "./assert";

export function parseFGBuildableManufacturer(data: unknown): Effect.Effect<FGBuildableManufacturer, ParseError> {
  assertVendorFGBuildableManufacturer(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          manufacturingSpeed: parseVendorFloat(data.mManufacturingSpeed),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableManufacturer = FGBuildableFactory & {
  manufacturingSpeed: number;
};
