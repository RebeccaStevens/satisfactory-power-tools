import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableSnowCannon } from "./assert";

export function parseFGBuildableSnowCannon(
  data: unknown,
): Effect.Effect<FGBuildableSnowCannon, ParseError> {
  assertVendorFGBuildableSnowCannon(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableSnowCannon = FGBuildable & {};
