import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableResourceSinkShop } from "./assert";

export function parseFGBuildableResourceSinkShop(
  data: unknown,
): Effect.Effect<FGBuildableResourceSinkShop, ParseError> {
  assertVendorFGBuildableResourceSinkShop(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableResourceSinkShop = FGBuildable & {};
