import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseString,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mWorkBenchOccupied"));
  assert(Object.hasOwn(data, "mWorkBenchFree"));
  assert(Object.hasOwn(data, "mShipUpgradeLevel"));
  assert(Object.hasOwn(data, "mStorageText"));
  assert(Object.hasOwn(data, "mMamFreeText"));
  assert(Object.hasOwn(data, "mMamOccupiedText"));
  assert(Object.hasOwn(data, "mStorageInventorySize"));
  assert(Object.hasOwn(data, "mStorageVisibilityLevel"));
  assert(Object.hasOwn(data, "mSpawningGroundZOffset"));
  assert(Object.hasOwn(data, "mGroundSearchZDistance"));
  assert(Object.hasOwn(data, "mNeedPlayingBuildEffectNotification"));
  assert(Object.hasOwn(data, "mRepresentationText"));

  return {
    ...buildableBuilding,
    mWorkBenchOccupied: parseString(data.mWorkBenchOccupied),
    mWorkBenchFree: parseString(data.mWorkBenchFree),
    mShipUpgradeLevel: parseNumber(data.mShipUpgradeLevel),
    mStorageText: parseString(data.mStorageText),
    mMamFreeText: parseString(data.mMamFreeText),
    mMamOccupiedText: parseString(data.mMamOccupiedText),
    mStorageInventorySize: parseNumber(data.mStorageInventorySize),
    mStorageVisibilityLevel: parseNumber(data.mStorageVisibilityLevel),
    mSpawningGroundZOffset: parseNumber(data.mSpawningGroundZOffset),
    mGroundSearchZDistance: parseNumber(data.mGroundSearchZDistance),
    mNeedPlayingBuildEffectNotification: parseBoolean(
      data.mNeedPlayingBuildEffectNotification,
    ),
    mRepresentationText: parseString(data.mRepresentationText),
  };
}
