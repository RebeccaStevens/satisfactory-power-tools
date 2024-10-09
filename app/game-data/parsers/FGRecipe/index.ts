import { Effect, pipe } from "effect";

import {
  type AbstractBase,
  parseAbstractBase,
} from "~/game-data/parsers/abstractBase";
import { MenuPriority, Second } from "~/types";

import { parseItemAmounts } from "../common";
import type { ParseError } from "../errors";
import { parseFloat, parseListNullable } from "../primitives";
import type { ItemAmount } from "../types";

import { assertVendorFGRecipe } from "./assert";

export function parseFGRecipe(
  data: unknown,
): Effect.Effect<FGRecipe, ParseError> {
  assertVendorFGRecipe(data);

  return pipe(
    Effect.all([
      parseAbstractBase(data),
      pipe(
        Effect.all({
          ingredients: parseItemAmounts(data.mIngredients),
          products: parseItemAmounts(data.mProduct),
          menuPriority: parseFloat(data.mManufacturingMenuPriority).pipe(
            Effect.map(MenuPriority),
          ),
          duration: parseFloat(data.mManufactoringDuration).pipe(
            Effect.map(Second),
          ),
          producedIn: parseListNullable(data.mProducedIn),
          variablePowerConsumptionConstant: parseFloat(
            data.mVariablePowerConsumptionConstant,
          ),
          variablePowerConsumptionFactor: parseFloat(
            data.mVariablePowerConsumptionFactor,
          ),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGRecipe = AbstractBase & {
  ingredients: ItemAmount[] | null;
  products: ItemAmount[] | null;
  menuPriority: MenuPriority;
  duration: Second;
  producedIn: string[] | null;
  variablePowerConsumptionConstant: number;
  variablePowerConsumptionFactor: number;
};
