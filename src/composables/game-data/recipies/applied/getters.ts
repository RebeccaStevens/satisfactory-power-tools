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

  if (generatorFuelRecipes.has(appliedRecipe.recipe.id)) {
    const fuelAmount = [...appliedRecipe.recipe.ingredients][0];
    assert(fuelAmount !== undefined);
    const fuel = fuelAmount[0];
    return t("game-data.recipes.generator.fuel.name", {
      fuel: t(`game-data.classes.${fuel.id}.name`),
    });
  }

  return t(`game-data.classes.${appliedRecipe.recipe.id}.name`);
}

/**
 * Get the icon of an applied recipe.
 */
export function getAppliedRecipeIcons(appliedRecipe: Readonly<AppliedRecipe>) {
  const generatorFuelRecipes = useGeneratorFuelRecipesMap();
  const images = [
    ...(generatorFuelRecipes.has(appliedRecipe.recipe.id)
      ? [useGameImage(energy.icon)]
      : []),
    ...appliedRecipe.recipe.products
      .keys()
      .map((item) => useGameImage(item.icon)),
  ];

  if (images.length > 0) {
    return images;
  }

  return [useGameImage(null)];
}
