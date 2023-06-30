import {
  useAppliedRecipesSorterByMachine,
  useAutomatableRecipes,
  useGeneratorFuelRecipes,
} from "~/composables/game-data";
import { type AppliedRecipe } from "~/data/types";

import { createAppliedRecipes } from "./create";

/**
 * Cache the list of generator fuel applied recipes.
 */
let m_generatorFuel: ReadonlyArray<Readonly<AppliedRecipe>> | undefined =
  undefined;

/**
 * Get the generator fuel applied recipes.
 */
export function useGeneratorFuelAppliedRecipes() {
  if (m_generatorFuel !== undefined) {
    return m_generatorFuel;
  }
  m_generatorFuel = useGeneratorFuelRecipes().flatMap(createAppliedRecipes);
  return m_generatorFuel;
}

/**
 * Cache the list of automatable applied recipes.
 */
let m_automatableAppliedRecipes:
  | ReadonlyArray<Readonly<AppliedRecipe>>
  | undefined = undefined;

/**
 * Get the automatable applied recipes.
 */
export function useAutomatableAppliedRecipes() {
  if (m_automatableAppliedRecipes !== undefined) {
    return m_automatableAppliedRecipes;
  }
  // eslint-disable-next-line functional/immutable-data -- False positive.
  m_automatableAppliedRecipes = useAutomatableRecipes()
    .flatMap(createAppliedRecipes)
    .sort(useAppliedRecipesSorterByMachine);
  return m_automatableAppliedRecipes;
}
