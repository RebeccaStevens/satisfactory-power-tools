import { Effect, pipe } from "effect";

import { type FGNamed, parseFGNamed } from "~/game-data/generate/parsers/abstract/FGNamed";
import { parseFullClassNames, parseItemAmounts } from "~/game-data/generate/parsers/common";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat, parseVendorList } from "~/game-data/generate/parsers/primitives";
import type { VendorItemAmount } from "~/game-data/generate/parsers/types";

import { assertVendorFGRecipe } from "./assert";

export function parseFGRecipe(data: unknown): Effect.Effect<FGRecipe, ParseError> {
  assertVendorFGRecipe(data);

  return pipe(
    Effect.all([
      parseFGNamed(data),
      pipe(
        Effect.all({
          ingredients: parseItemAmounts(data.mIngredients),
          products: parseItemAmounts(data.mProduct),
          menuPriority: parseVendorFloat(data.mManufacturingMenuPriority),
          duration: parseVendorFloat(data.mManufactoringDuration),
          producedIn: pipe(parseVendorList(data.mProducedIn), Effect.andThen(parseFullClassNames)),
          variablePowerConsumptionConstant: parseVendorFloat(data.mVariablePowerConsumptionConstant),
          variablePowerConsumptionFactor: parseVendorFloat(data.mVariablePowerConsumptionFactor),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGRecipe = FGNamed & {
  ingredients: VendorItemAmount[];
  products: VendorItemAmount[];
  menuPriority: number;
  duration: number;
  producedIn: string[];
  variablePowerConsumptionConstant: number;
  variablePowerConsumptionFactor: number;
};
