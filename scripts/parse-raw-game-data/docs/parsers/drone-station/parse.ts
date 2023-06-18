import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parsePoint3D,
  parseNumber,
  parseBoolean,
  parseItemTransferringStage,
  parseClasses,
  parseString,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mStoppedProducingAnimationSounds");
  assertPropertyExists(data, "mDroneDockingStartLocationLocal");
  assertPropertyExists(data, "mDroneDockingLocationLocal");
  assertPropertyExists(data, "mBatteryClasses");
  assertPropertyExists(data, "mStationHasDronesInQueue");
  assertPropertyExists(data, "mItemTransferringStage");
  assertPropertyExists(data, "mTransferProgress");
  assertPropertyExists(data, "mTransferSpeed");
  assertPropertyExists(data, "mStackTransferSize");
  assertPropertyExists(data, "mDroneQueueRadius");
  assertPropertyExists(data, "mDroneQueueSeparationRadius");
  assertPropertyExists(data, "mDroneQueueVerticalSeparation");
  assertPropertyExists(data, "mTripPowerCost");
  assertPropertyExists(data, "mTripPowerPerMeterCost");
  assertPropertyExists(data, "mTripInformationSampleCount");
  assertPropertyExists(data, "mStorageSizeX");
  assertPropertyExists(data, "mStorageSizeY");
  assertPropertyExists(data, "mBatteryStorageSizeX");
  assertPropertyExists(data, "mBatteryStorageSizeY");
  assertPropertyExists(data, "mMapText");

  return {
    ...buildableBuilding,
    mStoppedProducingAnimationSounds: parseBoolean(
      data.mStoppedProducingAnimationSounds,
    ),
    mDroneDockingStartLocationLocal: parsePoint3D(
      data.mDroneDockingStartLocationLocal,
    ),
    mDroneDockingLocationLocal: parsePoint3D(data.mDroneDockingLocationLocal),
    mBatteryClasses: parseClasses(data.mBatteryClasses),
    mStationHasDronesInQueue: parseBoolean(data.mStationHasDronesInQueue),
    mItemTransferringStage: parseItemTransferringStage(
      data.mItemTransferringStage,
    ),
    mTransferProgress: parseNumber(data.mTransferProgress),
    mTransferSpeed: parseNumber(data.mTransferSpeed),
    mStackTransferSize: parseNumber(data.mStackTransferSize),
    mDroneQueueRadius: parseNumber(data.mDroneQueueRadius),
    mDroneQueueSeparationRadius: parseNumber(data.mDroneQueueSeparationRadius),
    mDroneQueueVerticalSeparation: parseNumber(
      data.mDroneQueueVerticalSeparation,
    ),
    mTripPowerCost: parseNumber(data.mTripPowerCost),
    mTripPowerPerMeterCost: parseNumber(data.mTripPowerPerMeterCost),
    mTripInformationSampleCount: parseNumber(data.mTripInformationSampleCount),
    mStorageSizeX: parseNumber(data.mStorageSizeX),
    mStorageSizeY: parseNumber(data.mStorageSizeY),
    mBatteryStorageSizeX: parseNumber(data.mBatteryStorageSizeX),
    mBatteryStorageSizeY: parseNumber(data.mBatteryStorageSizeY),
    mMapText: parseString(data.mMapText),
  };
}
