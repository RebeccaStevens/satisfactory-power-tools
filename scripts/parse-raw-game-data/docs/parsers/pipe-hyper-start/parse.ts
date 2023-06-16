import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mAudioTimerCounter" in data);
  assert("mOpeningOffset" in data);
  assert("mInitialMinSpeedFactor" in data);
  assert("mLength" in data);
  assert("mCanStack" in data);
  assert("mStackHeight" in data);
  assert("mUseStaticHeight" in data);

  return {
    ...buildableBuilding,
    mAudioTimerCounter: parseNumber(data.mAudioTimerCounter),
    mOpeningOffset: parseNumber(data.mOpeningOffset),
    mInitialMinSpeedFactor: parseNumber(data.mInitialMinSpeedFactor),
    mLength: parseNumber(data.mLength),
    mCanStack: parseBoolean(data.mCanStack),
    mStackHeight: parseNumber(data.mStackHeight),
    mUseStaticHeight: parseBoolean(data.mUseStaticHeight),
  };
}
