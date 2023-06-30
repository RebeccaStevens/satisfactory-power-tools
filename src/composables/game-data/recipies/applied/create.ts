import { assert } from "chai";
import { mul } from "uom-ts";

import {
  type QuantityPerMinute,
  type Seconds,
  type Quantity,
  type GeneralItem,
  type AppliedRecipe,
  type Recipe,
  isProductionMachine,
  isGeneratorFuelMachine,
  toQuantityPerMinute,
} from "~/data/types";
import { isNotNull } from "~/utils";

export function createAppliedRecipes(
  recipe: Readonly<Recipe>,
): AppliedRecipe[] {
  return [
    ...recipe.producedIn
      .values()
      .map((producedIn): AppliedRecipe | null => {
        if (isProductionMachine(producedIn)) {
          return {
            id: `applied-${recipe.id}-${producedIn.id}`,
            inputOutput: new Map<GeneralItem, QuantityPerMinute>([
              ...recipe.ingredients
                .entries()
                .map(([item, quantity]) =>
                  getIngredientRates(item, quantity, recipe.duration),
                ),
              ...recipe.products
                .entries()
                .map(([item, quantity]) =>
                  getProductRates(item, quantity, recipe.duration),
                ),
            ]),
            // eslint-disable-next-line functional/functional-parameters
            get powerDifferential() {
              assert(isProductionMachine(this.producedIn));
              return mul(this.producedIn.powerConsumption, -1);
            },
            producedIn,
            recipe,
          };
        }

        if (isGeneratorFuelMachine(producedIn)) {
          return {
            id: `applied-${recipe.id}-${producedIn.id}`,
            inputOutput: new Map<GeneralItem, QuantityPerMinute>([
              ...recipe.ingredients
                .entries()
                .map(([item, quantity]) =>
                  getIngredientRates(item, quantity, recipe.duration),
                ),
              ...recipe.products
                .entries()
                .map(([item, quantity]) =>
                  getProductRates(item, quantity, recipe.duration),
                ),
            ]),
            // eslint-disable-next-line functional/functional-parameters
            get powerDifferential() {
              assert(isGeneratorFuelMachine(this.producedIn));
              return this.producedIn.powerProduction;
            },
            producedIn,
            recipe,
          };
        }

        return null;
      })
      .filter(isNotNull),
  ];
}

function getIngredientRates(
  item: Readonly<GeneralItem>,
  quantity: Quantity,
  duration: Seconds,
): [GeneralItem, QuantityPerMinute] {
  return [
    item,
    mul(toQuantityPerMinute(quantity, duration), -1) as QuantityPerMinute,
  ];
}

function getProductRates(
  item: Readonly<GeneralItem>,
  quantity: Quantity,
  duration: Seconds,
): [GeneralItem, QuantityPerMinute] {
  return [item, toQuantityPerMinute(quantity, duration)];
}
