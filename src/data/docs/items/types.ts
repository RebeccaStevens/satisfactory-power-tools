import type { Ided, Named } from "~/data/types";

/**
 * The type of item.
 */
export const enum ItemType {
  PART = "part",
  RESOURCE = "resource",
  NON_PHYSICAL = "non-physical",
}

/**
 * How the item can be transferred.
 */
export const enum TransferType {
  BELT = "belt",
  PIPE = "pipe",
  NONE = "none", // Can't be transfer or can be transfer instantaneously.
}

/**
 * An Item.
 */
export type Item = NonPhysicalItem | PartItem | ResourceItem;

/**
 * Common to all items
 */
export type ItemBase = Ided &
  Named & {
    itemType: ItemType;
    transferType: TransferType;
  };

/**
 * Common to physical items
 */
export type PhysicalItemBase = ItemBase & {
  itemType: ItemType.PART | ItemType.RESOURCE;
  transferType: TransferType.BELT | TransferType.PIPE;
  energy: number;
  sinkable: boolean;
  sinkPoints: number;
};

/**
 * A non-physical item.
 */
export type NonPhysicalItem = ItemBase & {
  itemType: ItemType.NON_PHYSICAL;
  transferType: TransferType.NONE;
};

/**
 * A part item.
 */
export type PartItem = PhysicalItemBase & {
  itemType: ItemType.PART;
};

/**
 * A resource item.
 */
export type ResourceItem = PhysicalItemBase & {
  itemType: ItemType.RESOURCE;
  collectSpeedMultiplier: number;
};
