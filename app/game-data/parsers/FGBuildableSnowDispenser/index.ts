import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableSnowDispenser } from "./assert";

export function parseFGBuildableSnowDispenser(
  data: unknown,
): Effect.Effect<FGBuildableSnowDispenser, ParseError> {
  assertVendorFGBuildableSnowDispenser(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableSnowDispenser = FGBuildable & {};
