import type { Effect } from "effect";

import { type FGRecipe, parseFGRecipe } from "~/game-data/generate/parsers/FGRecipe";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGCustomizationRecipe } from "./assert";

export function parseFGCustomizationRecipe(data: unknown): Effect.Effect<FGCustomizationRecipe, ParseError> {
  assertVendorFGCustomizationRecipe(data);
  return parseFGRecipe(data);
}

export type FGCustomizationRecipe = FGRecipe;
