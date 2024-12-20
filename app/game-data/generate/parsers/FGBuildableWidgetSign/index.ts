import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableWidgetSign } from "./assert";

export function parseFGBuildableWidgetSign(data: unknown): Effect.Effect<FGBuildableWidgetSign, ParseError> {
  assertVendorFGBuildableWidgetSign(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableWidgetSign = FGBuildable & {};
