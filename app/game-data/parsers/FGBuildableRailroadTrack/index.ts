import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableRailroadTrack } from "./assert";

export function parseFGBuildableRailroadTrack(
  data: unknown,
): Effect.Effect<FGBuildableRailroadTrack, ParseError> {
  assertVendorFGBuildableRailroadTrack(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableRailroadTrack = FGBuildable & {};
