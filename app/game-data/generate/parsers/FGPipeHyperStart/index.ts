import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGPipeHyperStart } from "./assert";

export function parseFGPipeHyperStart(data: unknown): Effect.Effect<FGPipeHyperStart, ParseError> {
  assertVendorFGPipeHyperStart(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGPipeHyperStart = FGBuildable & {};
