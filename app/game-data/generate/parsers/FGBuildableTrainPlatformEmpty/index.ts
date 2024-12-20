import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableTrainPlatformEmpty } from "./assert";

export function parseFGBuildableTrainPlatformEmpty(
  data: unknown,
): Effect.Effect<FGBuildableTrainPlatformEmpty, ParseError> {
  assertVendorFGBuildableTrainPlatformEmpty(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableTrainPlatformEmpty = FGBuildable & {};
