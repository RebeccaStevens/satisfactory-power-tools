import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePoleBase } from "./assert";

export function parseFGBuildablePoleBase(data: unknown): Effect.Effect<FGBuildablePoleBase, ParseError> {
  assertVendorFGBuildablePoleBase(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePoleBase = FGBuildable & {};
