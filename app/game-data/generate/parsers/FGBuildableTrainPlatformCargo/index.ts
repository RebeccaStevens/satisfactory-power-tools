import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableTrainPlatformCargo } from "./assert";

export function parseFGBuildableTrainPlatformCargo(
  data: unknown,
): Effect.Effect<FGBuildableTrainPlatformCargo, ParseError> {
  assertVendorFGBuildableTrainPlatformCargo(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableTrainPlatformCargo = FGBuildable & {};
