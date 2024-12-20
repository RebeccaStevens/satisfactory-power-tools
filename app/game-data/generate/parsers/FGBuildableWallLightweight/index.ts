import type { Effect } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableWallLightweight } from "./assert";

export function parseFGBuildableWallLightweight(data: unknown): Effect.Effect<FGBuildableWallLightweight, ParseError> {
  assertVendorFGBuildableWallLightweight(data);
  return parseFGBuildable(data);
}

export type FGBuildableWallLightweight = FGBuildable & {};
