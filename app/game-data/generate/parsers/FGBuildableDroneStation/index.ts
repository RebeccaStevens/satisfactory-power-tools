import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableDroneStation } from "./assert";

export function parseFGBuildableDroneStation(data: unknown): Effect.Effect<FGBuildableDroneStation, ParseError> {
  assertVendorFGBuildableDroneStation(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableDroneStation = FGBuildable & {};
