import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePortalSatellite } from "./assert";

export function parseFGBuildablePortalSatellite(data: unknown): Effect.Effect<FGBuildablePortalSatellite, ParseError> {
  assertVendorFGBuildablePortalSatellite(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePortalSatellite = FGBuildable & {};
