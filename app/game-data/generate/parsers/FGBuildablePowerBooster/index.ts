import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePowerBooster } from "./assert";

export function parseFGBuildablePowerBooster(data: unknown): Effect.Effect<FGBuildablePowerBooster, ParseError> {
  assertVendorFGBuildablePowerBooster(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePowerBooster = FGBuildable & {};
