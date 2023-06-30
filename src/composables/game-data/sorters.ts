import { useGameDataName } from "~/composables/game-data";

import { type Displayable, type Idable } from "../../data/types";

/**
 * A sorting function that sorts entities by their name.
 */
export function useDisplayableSorter(
  a: Readonly<Displayable>,
  b: Readonly<Displayable>,
) {
  const menuPriorityDifference = a.menuPriority - b.menuPriority;
  if (menuPriorityDifference !== 0) {
    return menuPriorityDifference;
  }
  return useEntitySorterByName(a, b);
}

/**
 * A sorting function that sorts entities by their name.
 */
export function useEntitySorterByName(
  a: Readonly<Idable>,
  b: Readonly<Idable>,
) {
  return useGameDataName(a).localeCompare(useGameDataName(b));
}
