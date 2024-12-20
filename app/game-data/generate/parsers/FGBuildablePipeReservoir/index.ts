import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePipeReservoir } from "./assert";

export function parseFGBuildablePipeReservoir(data: unknown): Effect.Effect<FGBuildablePipeReservoir, ParseError> {
  assertVendorFGBuildablePipeReservoir(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePipeReservoir = FGBuildable & {};
