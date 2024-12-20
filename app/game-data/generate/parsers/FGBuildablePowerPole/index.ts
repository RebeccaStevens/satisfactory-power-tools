import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePowerPole } from "./assert";

export function parseFGBuildablePowerPole(data: unknown): Effect.Effect<FGBuildablePowerPole, ParseError> {
  assertVendorFGBuildablePowerPole(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePowerPole = FGBuildable & {};
