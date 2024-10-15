import type { Effect } from "effect";

import { type FGBuildable, parseFGBuildable } from "../FGBuildable";
import type { ParseError } from "../errors";

import { assertVendorFGBuildableFactoryBuilding } from "./assert";

export function parseFGBuildableFactoryBuilding(
  data: unknown,
): Effect.Effect<FGBuildableFactoryBuilding, ParseError> {
  assertVendorFGBuildableFactoryBuilding(data);
  return parseFGBuildable(data);
}

export type FGBuildableFactoryBuilding = FGBuildable;
