import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableLadder } from "./assert";

export function parseFGBuildableLadder(
  data: unknown,
): Effect.Effect<FGBuildableLadder, ParseError> {
  assertVendorFGBuildableLadder(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableLadder = FGBuildable & {};
