import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableTradingPost } from "./assert";

export function parseFGBuildableTradingPost(
  data: unknown,
): Effect.Effect<FGBuildableTradingPost, ParseError> {
  assertVendorFGBuildableTradingPost(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableTradingPost = FGBuildable & {};
