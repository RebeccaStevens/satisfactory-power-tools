import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePipelineJunction } from "./assert";

export function parseFGBuildablePipelineJunction(
  data: unknown,
): Effect.Effect<FGBuildablePipelineJunction, ParseError> {
  assertVendorFGBuildablePipelineJunction(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePipelineJunction = FGBuildable & {};
