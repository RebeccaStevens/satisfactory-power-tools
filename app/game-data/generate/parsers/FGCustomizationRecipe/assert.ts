import { type VendorFGRecipe, assertVendorFGRecipe } from "~/game-data/generate/parsers/FGRecipe/assert";

export function assertVendorFGCustomizationRecipe(data: unknown): asserts data is VendorFGCustomizationRecipe {
  assertVendorFGRecipe(data);
}

export type VendorFGCustomizationRecipe = VendorFGRecipe;
