import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableWalkway } from "./assert";

export function parseFGBuildableWalkway(data: unknown): Effect.Effect<FGBuildableWalkway, ParseError> {
  assertVendorFGBuildableWalkway(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableWalkway = FGBuildable & {};
