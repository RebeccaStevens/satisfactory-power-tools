import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/data/core/parsers";
import { parseNumber, parseBoolean } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mAudioTimerCounter"));
  assert(Object.hasOwn(data, "mOpeningOffset"));
  assert(Object.hasOwn(data, "mInitialMinSpeedFactor"));
  assert(Object.hasOwn(data, "mLength"));
  assert(Object.hasOwn(data, "mCanStack"));
  assert(Object.hasOwn(data, "mStackHeight"));
  assert(Object.hasOwn(data, "mUseStaticHeight"));

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
