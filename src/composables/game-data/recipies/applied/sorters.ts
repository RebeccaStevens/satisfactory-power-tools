import { assert } from "chai";

import { getAppliedRecipeName, useMachines } from "~/composables/game-data";
import {
  isProductionMachine,
  type AppliedRecipe,
  isGeneratorFuelMachine,
} from "~/data/types";

/**
 * A sorting function that sorts applied recipes by their name.
 */
export function useAppliedRecipesSorterByName(
  a: Readonly<AppliedRecipe>,
  b: Readonly<AppliedRecipe>,
) {
  return getAppliedRecipeName(a).localeCompare(getAppliedRecipeName(b));
}

/**
 * A sorting function that sorts applied recipes by their producer.
 */
export function useAppliedRecipesSorterByMachine(
  a: Readonly<AppliedRecipe>,
  b: Readonly<AppliedRecipe>,
) {
  if (a.producedIn === b.producedIn) {
    return useAppliedRecipesSorterByName(a, b);
  }

  assert(
    isProductionMachine(a.producedIn) || isGeneratorFuelMachine(a.producedIn),
  );
  assert(
    isProductionMachine(b.producedIn) || isGeneratorFuelMachine(b.producedIn),
  );

  const sortedMachines = useMachines();

  const aIndex = sortedMachines.indexOf(a.producedIn);
  const bIndex = sortedMachines.indexOf(b.producedIn);

  assert(aIndex >= 0);
  assert(bIndex >= 0);

  return aIndex - bIndex;
}
