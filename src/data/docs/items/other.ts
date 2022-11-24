import type { NonPhysicalItem } from "./types";
import { ItemType, TransferType } from "./types";

/**
 * Get all the non-physical types.
 */
export function getNonPhysicalItems(): NonPhysicalItem[] {
  const itemType = ItemType.NON_PHYSICAL;
  const transferType = TransferType.NONE;

  const points = {
    id: "points",
    name: "Points",
    itemType,
    transferType,
  } as const;

  return [points];
}
