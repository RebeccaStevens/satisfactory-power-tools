import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseString,
  parseNumber,
  parseColor,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const item = parseItem(data);

  assertPropertyExists(data, "mDecalSize");
  assertPropertyExists(data, "mPingColor");
  assertPropertyExists(data, "mCollectSpeedMultiplier");
  assertPropertyExists(data, "mManualMiningAudioName");

  return {
    ...item,
    mDecalSize: parseNumber(data.mDecalSize),
    mPingColor: parseColor(data.mPingColor),
    mCollectSpeedMultiplier: parseNumber(data.mCollectSpeedMultiplier),
    mManualMiningAudioName: parseString(data.mManualMiningAudioName),
  };
}
