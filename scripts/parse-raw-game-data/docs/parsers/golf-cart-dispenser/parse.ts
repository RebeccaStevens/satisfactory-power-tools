import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseString,
  parseBoolean,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mMaxSpawnDistance");
  assertPropertyExists(data, "mSpawningClearance");
  assertPropertyExists(data, "mBuildDisqualifierText");
  assertPropertyExists(data, "canDisplayDisqualifier");
  assertPropertyExists(data, "mPlaceDistanceMax");

  return {
    ...equipment,
    mMaxSpawnDistance: parseNumber(data.mMaxSpawnDistance),
    mSpawningClearance: parseNumber(data.mSpawningClearance),
    mBuildDisqualifierText: parseString(data.mBuildDisqualifierText),
    canDisplayDisqualifier: parseBoolean(data.canDisplayDisqualifier),
    mPlaceDistanceMax: parseNumber(data.mPlaceDistanceMax),
  };
}
