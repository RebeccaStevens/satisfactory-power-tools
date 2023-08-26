import { assert } from "chai";

import {
  useGameImage,
  useGeneratorFuelRecipesMap,
} from "~/composables/game-data";
import { energy } from "~/data/special-items";
import { type AppliedRecipe } from "~/data/types";

/**
 * Get the name of an applied recipe.
 */
export function getAppliedRecipeName(
  appliedRecipe: Readonly<AppliedRecipe>,
): string {
  const { t } = useI18n();
  const generatorFuelRecipes = useGeneratorFuelRecipesMap();
  const { recipe } = appliedRecipe;

  if (recipe === null) {
    // TODO: translate/use better name.
    return "N/A";
  }

  if (generatorFuelRecipes.has(recipe.id)) {
    const fuelAmount = [...recipe.ingredients][0];
    assert(fuelAmount !== undefined);
    const fuel = fuelAmount[0];
    return t("game-data.recipes.generator.fuel.name", {
      fuel: t(`game-data.classes.${fuel.id}.name`),
    });
  }

  return t(`game-data.classes.${recipe.id}.name`);
}

/**
 * Get the icon of an applied recipe.
 */
export function getAppliedRecipeIcons(appliedRecipe: Readonly<AppliedRecipe>) {
  const generatorFuelRecipes = useGeneratorFuelRecipesMap();
  const { recipe } = appliedRecipe;

  if (recipe !== null) {
    const images = [
      ...(generatorFuelRecipes.has(recipe.id)
        ? [useGameImage(energy.icon)]
        : []),
      ...[...recipe.products.keys()].map((item) => useGameImage(item.icon)),
    ];

    if (images.length > 0) {
      return images;
    }
  }

  return [useGameImage(null)];
}
