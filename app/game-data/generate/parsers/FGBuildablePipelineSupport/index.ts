import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePipelineSupport } from "./assert";

export function parseFGBuildablePipelineSupport(data: unknown): Effect.Effect<FGBuildablePipelineSupport, ParseError> {
  assertVendorFGBuildablePipelineSupport(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePipelineSupport = FGBuildable & {};
