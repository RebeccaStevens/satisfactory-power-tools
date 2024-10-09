import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableSplitterSmart } from "./assert";

export function parseFGBuildableSplitterSmart(
  data: unknown,
): Effect.Effect<FGBuildableSplitterSmart, ParseError> {
  assertVendorFGBuildableSplitterSmart(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableSplitterSmart = FGBuildable & {};
