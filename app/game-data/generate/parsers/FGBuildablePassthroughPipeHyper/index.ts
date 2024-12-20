import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePassthroughPipeHyper } from "./assert";

export function parseFGBuildablePassthroughPipeHyper(
  data: unknown,
): Effect.Effect<FGBuildablePassthroughPipeHyper, ParseError> {
  assertVendorFGBuildablePassthroughPipeHyper(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePassthroughPipeHyper = FGBuildable & {};
