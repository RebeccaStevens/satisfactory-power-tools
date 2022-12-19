import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePoint2D,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mDockPosition" in data);
  assert("mMinimumDockingTime" in data);
  assert("mStorageSizeX" in data);
  assert("mStorageSizeY" in data);
  assert("mFuelInventorySizeX" in data);
  assert("mFuelInventorySizeY" in data);
  assert("mTransferSpeed" in data);
  assert("mFuelTransferSpeed" in data);
  assert("mStackTransferSize" in data);
  assert("mForceSignificance" in data);
  assert("mVehicleFuelConsumptionRate" in data);
  assert("mItemTransferRate" in data);
  assert("mMaximumStackTransferRate" in data);

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
