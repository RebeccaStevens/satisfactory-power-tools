import { Effect, pipe } from "effect";

import { type FGBuildableFactory, parseFGBuildableFactory } from "~/game-data/generate/parsers/FGBuildableFactory";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorAbstractFGBuildableGenerator } from "./assert";

export function parseAbstractFGBuildableGenerator(
  data: unknown,
): Effect.Effect<AbstractFGBuildableGenerator, ParseError> {
  assertVendorAbstractFGBuildableGenerator(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          powerProduction: parseVendorFloat(data.mPowerProduction),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type AbstractFGBuildableGenerator = FGBuildableFactory & {
  powerProduction: number;
};
