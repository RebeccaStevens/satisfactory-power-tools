import assert from "node:assert/strict";

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

  assert("mDecalSize" in data);
  assert("mPingColor" in data);
  assert("mCollectSpeedMultiplier" in data);
  assert("mManualMiningAudioName" in data);

  return {
    ...item,
    mDecalSize: parseNumber(data.mDecalSize),
    mPingColor: parseColor(data.mPingColor),
    mCollectSpeedMultiplier: parseNumber(data.mCollectSpeedMultiplier),
    mManualMiningAudioName: parseString(data.mManualMiningAudioName),
  };
}
