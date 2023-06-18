import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "mWorkBenchOccupied");
  assertPropertyExists(data, "mWorkBenchFree");
  assertPropertyExists(data, "mShipUpgradeLevel");
  assertPropertyExists(data, "mStorageText");
  assertPropertyExists(data, "mMamFreeText");
  assertPropertyExists(data, "mMamOccupiedText");
  assertPropertyExists(data, "mStorageInventorySize");
  assertPropertyExists(data, "mStorageVisibilityLevel");
  assertPropertyExists(data, "mSpawningGroundZOffset");
  assertPropertyExists(data, "mGroundSearchZDistance");
  assertPropertyExists(data, "mNeedPlayingBuildEffectNotification");
  assertPropertyExists(data, "mRepresentationText");

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
