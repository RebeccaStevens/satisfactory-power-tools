import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const consumableEquipment = parseConsumableEquipment(data);

  assert("mPlayingSound" in data);
  assert("mScanlineLerpT" in data);
  assert("mScreenUpdateTime" in data);
  assert("mNormalizedCloesnessToObject" in data);
  assert("mObjectIsWithinRange" in data);
  assert("mBeepDelayMax" in data);
  assert("mBeepDelayMin" in data);
  assert("mDetectionRange" in data);
  assert("mUpdateClosestObjectTime" in data);
  assert("mScannableDescriptors" in data);
  assert("mShouldBeepEvenIfNoObject" in data);

  return {
    ...consumableEquipment,
    mPlayingSound: parseBoolean(data.mPlayingSound),
    mScanlineLerpT: parseNumber(data.mScanlineLerpT),
    mScreenUpdateTime: parseNumber(data.mScreenUpdateTime),
    mNormalizedCloesnessToObject: parseNumber(
      data.mNormalizedCloesnessToObject,
    ),
    mObjectIsWithinRange: parseBoolean(data.mObjectIsWithinRange),
    mBeepDelayMax: parseNumber(data.mBeepDelayMax),
    mBeepDelayMin: parseNumber(data.mBeepDelayMin),
    mDetectionRange: parseNumber(data.mDetectionRange),
    mUpdateClosestObjectTime: parseNumber(data.mUpdateClosestObjectTime),
    mScannableDescriptors: parseClasses(data.mScannableDescriptors),
    mShouldBeepEvenIfNoObject: parseBoolean(data.mShouldBeepEvenIfNoObject),
  };
}
