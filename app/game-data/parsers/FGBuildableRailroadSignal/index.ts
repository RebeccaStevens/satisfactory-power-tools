import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableRailroadSignal } from "./assert";

export function parseFGBuildableRailroadSignal(
  data: unknown,
): Effect.Effect<FGBuildableRailroadSignal, ParseError> {
  assertVendorFGBuildableRailroadSignal(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableRailroadSignal = FGBuildable & {};
