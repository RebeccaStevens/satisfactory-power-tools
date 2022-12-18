import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const consumableEquipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mPlayingSound"));
  assert(Object.hasOwn(data, "mScanlineLerpT"));
  assert(Object.hasOwn(data, "mScreenUpdateTime"));
  assert(Object.hasOwn(data, "mNormalizedCloesnessToObject"));
  assert(Object.hasOwn(data, "mObjectIsWithinRange"));
  assert(Object.hasOwn(data, "mBeepDelayMax"));
  assert(Object.hasOwn(data, "mBeepDelayMin"));
  assert(Object.hasOwn(data, "mDetectionRange"));
  assert(Object.hasOwn(data, "mUpdateClosestObjectTime"));
  assert(Object.hasOwn(data, "mScannableDescriptors"));
  assert(Object.hasOwn(data, "mShouldBeepEvenIfNoObject"));

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
