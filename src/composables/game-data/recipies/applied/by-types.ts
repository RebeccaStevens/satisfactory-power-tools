import {
  useAppliedRecipesSorterByMachine,
  useAutomatableRecipes,
  useGeneralItems,
  useGeneratorFuelRecipes,
} from "~/composables/game-data";
import { type AppliedRecipe } from "~/data/types";
import { isNotNull } from "~/utils";

import { getAppliedRecipes, getResourceSinkAppliedRecipe } from "./create";

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
  m_generatorFuel = useGeneratorFuelRecipes().flatMap(getAppliedRecipes);
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
    .flatMap(getAppliedRecipes)
    .sort(useAppliedRecipesSorterByMachine);
  return m_automatableAppliedRecipes;
}

/**
 * Cache the list of sink applied recipes.
 */
let m_sinkAppliedRecipes: ReadonlyArray<Readonly<AppliedRecipe>> | undefined =
  undefined;

/**
 * Get the sink applied recipes.
 */
export function useSinkAppliedRecipes() {
  if (m_sinkAppliedRecipes !== undefined) {
    return m_sinkAppliedRecipes;
  }

  m_sinkAppliedRecipes = useGeneralItems()
    .map(getResourceSinkAppliedRecipe)
    .filter(isNotNull);
  return m_sinkAppliedRecipes;
}
