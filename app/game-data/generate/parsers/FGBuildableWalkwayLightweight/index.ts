import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableWalkwayLightweight } from "./assert";

export function parseFGBuildableWalkwayLightweight(
  data: unknown,
): Effect.Effect<FGBuildableWalkwayLightweight, ParseError> {
  assertVendorFGBuildableWalkwayLightweight(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableWalkwayLightweight = FGBuildable & {};
