import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePoint2D,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mDockPosition"));
  assert(Object.hasOwn(data, "mMinimumDockingTime"));
  assert(Object.hasOwn(data, "mStorageSizeX"));
  assert(Object.hasOwn(data, "mStorageSizeY"));
  assert(Object.hasOwn(data, "mFuelInventorySizeX"));
  assert(Object.hasOwn(data, "mFuelInventorySizeY"));
  assert(Object.hasOwn(data, "mTransferSpeed"));
  assert(Object.hasOwn(data, "mFuelTransferSpeed"));
  assert(Object.hasOwn(data, "mStackTransferSize"));
  assert(Object.hasOwn(data, "mForceSignificance"));
  assert(Object.hasOwn(data, "mVehicleFuelConsumptionRate"));
  assert(Object.hasOwn(data, "mItemTransferRate"));
  assert(Object.hasOwn(data, "mMaximumStackTransferRate"));

  return {
    ...buildableBuilding,
    mDockPosition: parsePoint2D(data.mDockPosition),
    mMinimumDockingTime: parseNumber(data.mMinimumDockingTime),
    mStorageSizeX: parseNumber(data.mStorageSizeX),
    mStorageSizeY: parseNumber(data.mStorageSizeY),
    mFuelInventorySizeX: parseNumber(data.mFuelInventorySizeX),
    mFuelInventorySizeY: parseNumber(data.mFuelInventorySizeY),
    mTransferSpeed: parseNumber(data.mTransferSpeed),
    mFuelTransferSpeed: parseNumber(data.mFuelTransferSpeed),
    mStackTransferSize: parseNumber(data.mStackTransferSize),
    mForceSignificance: parseBoolean(data.mForceSignificance),
    mVehicleFuelConsumptionRate: parseNumber(data.mVehicleFuelConsumptionRate),
    mItemTransferRate: parseNumber(data.mItemTransferRate),
    mMaximumStackTransferRate: parseNumber(data.mMaximumStackTransferRate),
  };
}
