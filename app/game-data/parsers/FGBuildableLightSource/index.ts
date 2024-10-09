import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableLightSource } from "./assert";

export function parseFGBuildableLightSource(
  data: unknown,
): Effect.Effect<FGBuildableLightSource, ParseError> {
  assertVendorFGBuildableLightSource(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableLightSource = FGBuildable & {};
