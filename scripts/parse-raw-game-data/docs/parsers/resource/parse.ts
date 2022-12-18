import assert from "node:assert/strict";

import { parseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseString,
  parseNumber,
  parseColor,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const item = parseItem(data);

  assert(Object.hasOwn(data, "mDecalSize"));
  assert(Object.hasOwn(data, "mPingColor"));
  assert(Object.hasOwn(data, "mCollectSpeedMultiplier"));
  assert(Object.hasOwn(data, "mManualMiningAudioName"));

  return {
    ...item,
    mDecalSize: parseNumber(data.mDecalSize),
    mPingColor: parseColor(data.mPingColor),
    mCollectSpeedMultiplier: parseNumber(data.mCollectSpeedMultiplier),
    mManualMiningAudioName: parseString(data.mManualMiningAudioName),
  };
}