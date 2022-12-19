import assert from "node:assert/strict";

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

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mStoppedProducingAnimationSounds" in data);
  assert("mDroneDockingStartLocationLocal" in data);
  assert("mDroneDockingLocationLocal" in data);
  assert("mBatteryClasses" in data);
  assert("mStationHasDronesInQueue" in data);
  assert("mItemTransferringStage" in data);
  assert("mTransferProgress" in data);
  assert("mTransferSpeed" in data);
  assert("mStackTransferSize" in data);
  assert("mDroneQueueRadius" in data);
  assert("mDroneQueueSeparationRadius" in data);
  assert("mDroneQueueVerticalSeparation" in data);
  assert("mTripPowerCost" in data);
  assert("mTripPowerPerMeterCost" in data);
  assert("mTripInformationSampleCount" in data);
  assert("mStorageSizeX" in data);
  assert("mStorageSizeY" in data);
  assert("mBatteryStorageSizeX" in data);
  assert("mBatteryStorageSizeY" in data);
  assert("mMapText" in data);

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
