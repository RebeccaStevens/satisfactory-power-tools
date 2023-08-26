import { assert } from "chai";
import { mul } from "uom-ts";

import { useMachinesByName } from "~/composables/game-data/machines";
import { points } from "~/data/special-items";
import {
  type PointsQuantity,
  type ItemQuantity,
  type Item,
  type Idable,
  type QuantityPerMinute,
  type Seconds,
  type Quantity,
  type GeneralItem,
  type AppliedRecipe,
  type Recipe,
  isProductionMachine,
  isGeneratorFuelMachine,
  toQuantityPerMinute,
  isResourceSinkMachine,
} from "~/data/types";
import { isNotNull } from "~/utils";

const appliedRecipesByRecipeCache = new WeakMap<
  Recipe,
  ReadonlyArray<AppliedRecipe>
>();

const appliedRecipesCache = new Map<
  AppliedRecipe["id"],
  AppliedRecipe | null
>();

export function getAppliedRecipes(
  recipe: Readonly<Recipe>,
): ReadonlyArray<AppliedRecipe> {
  const cached = appliedRecipesByRecipeCache.get(recipe);
  if (cached !== undefined) {
    return cached;
  }

  // TODO: use iterator operation
  const appliedRecipes = [...recipe.producedIn.values()]
    .map(getAppliedRecipe(recipe))
    .filter(isNotNull);
  appliedRecipesByRecipeCache.set(recipe, appliedRecipes);

  // eslint-disable-next-line functional/no-loop-statements
  for (const appliedRecipe of appliedRecipes) {
    appliedRecipesCache.set(appliedRecipe.id, appliedRecipe);
  }

  return appliedRecipes;
}

function getAppliedRecipe(
  recipe: Readonly<Recipe>,
): (value: Readonly<Idable>) => AppliedRecipe | null {
  return (producedIn): AppliedRecipe | null => {
    const id = `applied_${recipe.id}_${producedIn.id}`;

    const cached = appliedRecipesCache.get(id);
    if (cached !== undefined) {
      return cached;
    }

    const appliedRecipe = createAppliedRecipe(id, recipe, producedIn);
    appliedRecipesCache.set(id, appliedRecipe);
    return appliedRecipe;
  };
}

function createAppliedRecipe(
  id: AppliedRecipe["id"],
  recipe: Readonly<Recipe>,
  producedIn: Readonly<Idable>,
): AppliedRecipe | null {
  if (isProductionMachine(producedIn)) {
    return {
      id,
      inputOutput: new Map<Item, QuantityPerMinute>([
        ...[...recipe.ingredients.entries()].map(([item, quantity]) =>
          getIngredientRates(item, quantity, recipe.duration),
        ),
        ...[...recipe.products.entries()].map(([item, quantity]) =>
          getProductRates(item, quantity, recipe.duration),
        ),
      ]),
      producedIn,
      recipe,
    };
  }

  if (isGeneratorFuelMachine(producedIn)) {
    return {
      id,
      inputOutput: new Map<Item, QuantityPerMinute>([
        ...[...recipe.ingredients.entries()].map(([item, quantity]) =>
          getIngredientRates(item, quantity, recipe.duration),
        ),
        ...[...recipe.products.entries()].map(([item, quantity]) =>
          getProductRates(item, quantity, recipe.duration),
        ),
      ]),
      producedIn,
      recipe,
    };
  }

  return null;
}

export function getResourceSinkAppliedRecipe(
  item: Readonly<GeneralItem>,
): AppliedRecipe | null {
  const id = `applied_sink_${item.id}`;

  const cached = appliedRecipesCache.get(id);
  if (cached !== undefined) {
    return cached;
  }

  const appliedRecipe = item.sinkable
    ? createResourceSinkAppliedRecipe(id, item)
    : null;
  appliedRecipesCache.set(id, appliedRecipe);
  return appliedRecipe;
}

function createResourceSinkAppliedRecipe(
  id: string,
  item: Readonly<GeneralItem>,
): AppliedRecipe {
  return {
    id,
    inputOutput: new Map<Item, QuantityPerMinute>([
      getIngredientRates(item, 1 as ItemQuantity, 1 as Seconds),
      getProductRates(points, item.points as PointsQuantity, 1 as Seconds),
    ]),
    producedIn: useMachinesByName().resourceSink,
    recipe: null,
  };
}

function getIngredientRates(
  item: Readonly<Item>,
  quantity: Quantity,
  duration: Seconds,
): [Item, QuantityPerMinute] {
  return [
    item,
    mul(toQuantityPerMinute(quantity, duration), -1) as QuantityPerMinute,
  ];
}

function getProductRates(
  item: Readonly<Item>,
  quantity: Quantity,
  duration: Seconds,
): [Item, QuantityPerMinute] {
  return [item, toQuantityPerMinute(quantity, duration)];
}
