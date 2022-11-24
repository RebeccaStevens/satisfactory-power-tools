import assert from "node:assert/strict";

import { isRawBase } from "~/data/docs/raw-types";
import { parseBase } from "~/data/docs/utils";
import { isObject } from "~/utils";

import type { RawItemBase, RawPartItem, RawResourceItem } from "./raw-types";
import { isRawItemBase, isRawPartsItem, isRawResourceItem } from "./raw-types";
import { ItemType, TransferType } from "./types";
import type {
  Item,
  ItemBase,
  PartItem,
  ResourceItem,
  PhysicalItemBase,
} from "./types";

/**
 * Parse the items out of the raw data.
 */
export function parseItems(
  rawData: ReadonlyMap<string, ReadonlyArray<unknown>>,
): Map<string, Item> {
  /**
   * The function used to map native class names to an array of its classes' data.
   */
  const getRawDataClasses = (nativeClass: string) => {
    const rawDataClasses = rawData.get(nativeClass);
    assert(rawDataClasses !== undefined, `Could not find "${nativeClass}"`);
    return rawDataClasses;
  };

  return new Map<string, Item>([
    ...parseResourceItems(
      ["Class'/Script/FactoryGame.FGResourceDescriptor'"].flatMap(
        getRawDataClasses,
      ),
    ),
    ...parsePartsItems(
      [
        "Class'/Script/FactoryGame.FGItemDescriptor'",
        "Class'/Script/FactoryGame.FGItemDescriptorBiomass'",
        "Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'",
        "Class'/Script/FactoryGame.FGConsumableDescriptor'",
        "Class'/Script/FactoryGame.FGEquipmentDescriptor'",
      ].flatMap(getRawDataClasses),
    ),
  ]);
}

/**
 * Parse the base data for the item.
 */
function parseItemBase<I extends ItemType, T extends TransferType>(
  rawData: Readonly<RawItemBase>,
  itemType: I,
  transferType: T,
): ItemBase & { itemType: I; transferType: T } {
  const base = parseBase(rawData, "item");

  return {
    ...base,
    itemType,
    transferType,
  };
}

/**
 * Parse the base data for the physical item.
 */
function parsePhysicalItemBase<Type extends PhysicalItemBase["itemType"]>(
  rawData: Readonly<RawItemBase>,
  itemType: Type,
): PhysicalItemBase & { itemType: Type } {
  assert(new Set(["RF_SOLID", "RF_LIQUID", "RF_GAS"]).has(rawData.mForm));
  const transferType =
    rawData.mForm === "RF_SOLID" ? TransferType.BELT : TransferType.PIPE;

  const base = parseItemBase(rawData, itemType, transferType);

  const energy = Number.parseFloat(rawData.mEnergyValue);
  assert(Number.isFinite(energy));

  const hasResourceSinkPoints =
    Object.hasOwn(rawData, "mResourceSinkPoints") &&
    typeof rawData.mResourceSinkPoints === "string";

  const sinkPoints = hasResourceSinkPoints
    ? Number.parseFloat(rawData.mResourceSinkPoints as string)
    : 0;
  assert(Number.isFinite(sinkPoints));

  assert(new Set(["True", "False"]).has(rawData.mCanBeDiscarded));
  const sinkable = hasResourceSinkPoints && rawData.mCanBeDiscarded === "True";

  return {
    ...base,
    itemType,
    energy,
    transferType,
    sinkable,
    sinkPoints,
  };
}

/**
 * Parse all the resource items.
 */
function parseResourceItems(rawData: ReadonlyArray<unknown>) {
  return rawData.map((rawClassData) => {
    assert(
      isObject(rawClassData) &&
        isRawBase(rawClassData) &&
        isRawItemBase(rawClassData) &&
        isRawResourceItem(rawClassData),
    );

    return parseResourceItem(rawClassData);
  });
}

/**
 * Parse a resource item.
 */
function parseResourceItem(
  rawData: Readonly<RawResourceItem>,
): [string, ResourceItem] {
  const base = parsePhysicalItemBase(rawData, ItemType.RESOURCE);

  const collectSpeedMultiplier = Number.parseFloat(
    rawData.mCollectSpeedMultiplier,
  );
  assert(Number.isFinite(collectSpeedMultiplier));

  return [
    rawData.ClassName,
    {
      ...base,
      collectSpeedMultiplier,
    },
  ];
}

/**
 * Parse all the parts items.
 */
function parsePartsItems(rawData: ReadonlyArray<unknown>) {
  return rawData.map((rawClassData) => {
    assert(
      isObject(rawClassData) &&
        isRawBase(rawClassData) &&
        isRawItemBase(rawClassData) &&
        isRawPartsItem(rawClassData),
    );

    return parsePartsItem(rawClassData);
  });
}

/**
 * Parse a parts item.
 */
function parsePartsItem(rawData: Readonly<RawPartItem>): [string, PartItem] {
  const base = parsePhysicalItemBase(rawData, ItemType.PART);

  return [rawData.ClassName, base];
}
