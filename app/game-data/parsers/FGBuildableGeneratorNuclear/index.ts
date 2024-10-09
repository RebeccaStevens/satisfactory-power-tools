import type { Effect } from "effect";

import {
  type FGBuildableGeneratorFuel,
  parseFGBuildableGeneratorFuel,
} from "~/game-data/parsers/FGBuildableGeneratorFuel";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableGeneratorNuclear } from "./assert";

export function parseFGBuildableGeneratorNuclear(
  data: unknown,
): Effect.Effect<FGBuildableGeneratorNuclear, ParseError> {
  assertVendorFGBuildableGeneratorNuclear(data);
  return parseFGBuildableGeneratorFuel(data);
}

export type FGBuildableGeneratorNuclear = FGBuildableGeneratorFuel & {};
