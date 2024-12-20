import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableJumppad } from "./assert";

export function parseFGBuildableJumppad(data: unknown): Effect.Effect<FGBuildableJumppad, ParseError> {
  assertVendorFGBuildableJumppad(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableJumppad = FGBuildable & {};
