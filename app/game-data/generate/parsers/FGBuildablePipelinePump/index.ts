import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePipelinePump } from "./assert";

export function parseFGBuildablePipelinePump(data: unknown): Effect.Effect<FGBuildablePipelinePump, ParseError> {
  assertVendorFGBuildablePipelinePump(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePipelinePump = FGBuildable & {};
