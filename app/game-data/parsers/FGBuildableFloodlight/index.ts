import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableFloodlight } from "./assert";

export function parseFGBuildableFloodlight(
  data: unknown,
): Effect.Effect<FGBuildableFloodlight, ParseError> {
  assertVendorFGBuildableFloodlight(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableFloodlight = FGBuildable & {};
