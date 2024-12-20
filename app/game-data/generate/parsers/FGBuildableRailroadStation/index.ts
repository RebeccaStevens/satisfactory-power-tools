import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableRailroadStation } from "./assert";

export function parseFGBuildableRailroadStation(data: unknown): Effect.Effect<FGBuildableRailroadStation, ParseError> {
  assertVendorFGBuildableRailroadStation(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableRailroadStation = FGBuildable & {};
