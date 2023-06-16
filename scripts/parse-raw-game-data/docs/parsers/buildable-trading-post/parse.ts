import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseString,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mWorkBenchOccupied" in data);
  assert("mWorkBenchFree" in data);
  assert("mShipUpgradeLevel" in data);
  assert("mStorageText" in data);
  assert("mMamFreeText" in data);
  assert("mMamOccupiedText" in data);
  assert("mStorageInventorySize" in data);
  assert("mStorageVisibilityLevel" in data);
  assert("mSpawningGroundZOffset" in data);
  assert("mGroundSearchZDistance" in data);
  assert("mNeedPlayingBuildEffectNotification" in data);
  assert("mRepresentationText" in data);

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
