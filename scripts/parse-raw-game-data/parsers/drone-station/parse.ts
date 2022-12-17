import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parsePoint3D,
  parseNumber,
  parseBoolean,
  parseItemTransferringStage,
  parseClasses,
  parseString,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mStoppedProducingAnimationSounds"));
  assert(Object.hasOwn(data, "mDroneDockingStartLocationLocal"));
  assert(Object.hasOwn(data, "mDroneDockingLocationLocal"));
  assert(Object.hasOwn(data, "mBatteryClasses"));
  assert(Object.hasOwn(data, "mStationHasDronesInQueue"));
  assert(Object.hasOwn(data, "mItemTransferringStage"));
  assert(Object.hasOwn(data, "mTransferProgress"));
  assert(Object.hasOwn(data, "mTransferSpeed"));
  assert(Object.hasOwn(data, "mStackTransferSize"));
  assert(Object.hasOwn(data, "mDroneQueueRadius"));
  assert(Object.hasOwn(data, "mDroneQueueSeparationRadius"));
  assert(Object.hasOwn(data, "mDroneQueueVerticalSeparation"));
  assert(Object.hasOwn(data, "mTripPowerCost"));
  assert(Object.hasOwn(data, "mTripPowerPerMeterCost"));
  assert(Object.hasOwn(data, "mTripInformationSampleCount"));
  assert(Object.hasOwn(data, "mStorageSizeX"));
  assert(Object.hasOwn(data, "mStorageSizeY"));
  assert(Object.hasOwn(data, "mBatteryStorageSizeX"));
  assert(Object.hasOwn(data, "mBatteryStorageSizeY"));
  assert(Object.hasOwn(data, "mMapText"));

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
