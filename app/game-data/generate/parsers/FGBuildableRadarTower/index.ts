import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableRadarTower } from "./assert";

export function parseFGBuildableRadarTower(data: unknown): Effect.Effect<FGBuildableRadarTower, ParseError> {
  assertVendorFGBuildableRadarTower(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableRadarTower = FGBuildable & {};
