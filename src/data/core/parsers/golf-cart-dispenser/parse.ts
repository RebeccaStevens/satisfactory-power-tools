import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/data/core/parsers";
import { parseString, parseBoolean, parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const equipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mMaxSpawnDistance"));
  assert(Object.hasOwn(data, "mSpawningClearance"));
  assert(Object.hasOwn(data, "mBuildDisqualifierText"));
  assert(Object.hasOwn(data, "canDisplayDisqualifier"));
  assert(Object.hasOwn(data, "mPlaceDistanceMax"));

  return {
    ...equipment,
    mMaxSpawnDistance: parseNumber(data.mMaxSpawnDistance),
    mSpawningClearance: parseNumber(data.mSpawningClearance),
    mBuildDisqualifierText: parseString(data.mBuildDisqualifierText),
    canDisplayDisqualifier: parseBoolean(data.canDisplayDisqualifier),
    mPlaceDistanceMax: parseNumber(data.mPlaceDistanceMax),
  };
}
