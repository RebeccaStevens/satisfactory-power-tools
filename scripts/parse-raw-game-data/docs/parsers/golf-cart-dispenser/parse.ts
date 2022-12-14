import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseString,
  parseBoolean,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assert("mMaxSpawnDistance" in data);
  assert("mSpawningClearance" in data);
  assert("mBuildDisqualifierText" in data);
  assert("canDisplayDisqualifier" in data);
  assert("mPlaceDistanceMax" in data);

  return {
    ...equipment,
    mMaxSpawnDistance: parseNumber(data.mMaxSpawnDistance),
    mSpawningClearance: parseNumber(data.mSpawningClearance),
    mBuildDisqualifierText: parseString(data.mBuildDisqualifierText),
    canDisplayDisqualifier: parseBoolean(data.canDisplayDisqualifier),
    mPlaceDistanceMax: parseNumber(data.mPlaceDistanceMax),
  };
}
