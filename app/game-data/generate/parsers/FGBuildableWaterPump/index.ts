import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableWaterPump } from "./assert";

export function parseFGBuildableWaterPump(data: unknown): Effect.Effect<FGBuildableWaterPump, ParseError> {
  assertVendorFGBuildableWaterPump(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableWaterPump = FGBuildable & {};
