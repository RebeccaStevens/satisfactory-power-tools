import type { RawBase } from "~/data/docs/raw-types";

export type RawItemBase = RawBase & {
  mEnergyValue: string;
  mForm: string;
  mCanBeDiscarded: string;
};

export function isRawItemBase<T extends RawBase>(
  rawData: T,
): rawData is RawItemBase & T {
  return (
    Object.hasOwn(rawData, "mEnergyValue") &&
    typeof rawData.mEnergyValue === "string" &&
    Object.hasOwn(rawData, "mForm") &&
    typeof rawData.mForm === "string" &&
    Object.hasOwn(rawData, "mCanBeDiscarded") &&
    typeof rawData.mCanBeDiscarded === "string"
  );
}

export type RawPartItem = RawItemBase;

export function isRawPartsItem<T extends RawItemBase>(
  rawData: T,
): rawData is RawPartItem & T {
  return true;
}

export type RawResourceItem = RawItemBase & {
  mCollectSpeedMultiplier: string;
};

export function isRawResourceItem<T extends RawItemBase>(
  rawData: T,
): rawData is RawResourceItem & T {
  return (
    Object.hasOwn(rawData, "mCollectSpeedMultiplier") &&
    typeof rawData.mCollectSpeedMultiplier === "string"
  );
}
