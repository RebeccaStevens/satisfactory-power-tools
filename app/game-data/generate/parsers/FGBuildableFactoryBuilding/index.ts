import type { Effect } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableFactoryBuilding } from "./assert";

export function parseFGBuildableFactoryBuilding(data: unknown): Effect.Effect<FGBuildableFactoryBuilding, ParseError> {
  assertVendorFGBuildableFactoryBuilding(data);
  return parseFGBuildable(data);
}

export type FGBuildableFactoryBuilding = FGBuildable & {};
