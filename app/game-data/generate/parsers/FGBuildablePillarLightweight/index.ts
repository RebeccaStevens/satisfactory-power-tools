import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePillarLightweight } from "./assert";

export function parseFGBuildablePillarLightweight(
  data: unknown,
): Effect.Effect<FGBuildablePillarLightweight, ParseError> {
  assertVendorFGBuildablePillarLightweight(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePillarLightweight = FGBuildable & {};
