import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mAudioTimerCounter");
  assertPropertyExists(data, "mOpeningOffset");
  assertPropertyExists(data, "mInitialMinSpeedFactor");
  assertPropertyExists(data, "mLength");
  assertPropertyExists(data, "mCanStack");
  assertPropertyExists(data, "mStackHeight");
  assertPropertyExists(data, "mUseStaticHeight");

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
