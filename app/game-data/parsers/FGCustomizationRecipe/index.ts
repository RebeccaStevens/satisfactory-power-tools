import type { Effect } from "effect";

import { type FGRecipe, parseFGRecipe } from "~/game-data/parsers/FGRecipe";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGCustomizationRecipe } from "./assert";

export function parseFGCustomizationRecipe(
  data: unknown,
): Effect.Effect<FGCustomizationRecipe, ParseError> {
  assertVendorFGCustomizationRecipe(data);
  return parseFGRecipe(data);
}

export type FGCustomizationRecipe = FGRecipe;
