import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableFoundationLightweight } from "./assert";

export function parseFGBuildableFoundationLightweight(
  data: unknown,
): Effect.Effect<FGBuildableFoundationLightweight, ParseError> {
  assertVendorFGBuildableFoundationLightweight(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableFoundationLightweight = FGBuildable & {};
