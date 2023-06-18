import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePoint2D,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mDockPosition");
  assertPropertyExists(data, "mMinimumDockingTime");
  assertPropertyExists(data, "mStorageSizeX");
  assertPropertyExists(data, "mStorageSizeY");
  assertPropertyExists(data, "mFuelInventorySizeX");
  assertPropertyExists(data, "mFuelInventorySizeY");
  assertPropertyExists(data, "mTransferSpeed");
  assertPropertyExists(data, "mFuelTransferSpeed");
  assertPropertyExists(data, "mStackTransferSize");
  assertPropertyExists(data, "mForceSignificance");
  assertPropertyExists(data, "mVehicleFuelConsumptionRate");
  assertPropertyExists(data, "mItemTransferRate");
  assertPropertyExists(data, "mMaximumStackTransferRate");

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
