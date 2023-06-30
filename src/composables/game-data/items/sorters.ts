import { useDisplayableSorter } from "~/composables/game-data";
import { points } from "~/data/special-items";
import { isGeneralItem, type Item } from "~/data/types";
import { belt, pipe } from "~/data/types";

/**
 * A sorting function that sorts items by their points.
 */
export function useItemSorterByPoints(a: Readonly<Item>, b: Readonly<Item>) {
  if (isGeneralItem(a)) {
    if (isGeneralItem(b)) {
      const pointDiff = b.points - a.points;
      if (pointDiff !== 0) {
        return pointDiff;
      }
      return useDisplayableSorter(a, b);
    }

    return b === points ? 1 : a.points > 0 ? -1 : 0;
  }

  if (isGeneralItem(b)) {
    return a === points ? -1 : b.points > 0 ? 1 : 0;
  }

  return useDisplayableSorter(a, b);
}

/**
 * A sorting function that sorts items by their transporter type.
 */
export function useItemSorterByTransporter(
  a: Readonly<Item>,
  b: Readonly<Item>,
) {
  if (a.transporter === b.transporter) {
    return useDisplayableSorter(a, b);
  }

  if (a.transporter === belt) {
    return -1;
  }
  if (b.transporter === belt) {
    return 1;
  }
  if (a.transporter === pipe) {
    return -1;
  }
  if (b.transporter === pipe) {
    return 1;
  }

  return useDisplayableSorter(a, b);
}
