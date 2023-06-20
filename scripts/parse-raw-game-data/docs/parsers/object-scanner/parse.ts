import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const consumableEquipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mPlayingSound");
  assertPropertyExists(data, "mScanlineLerpT");
  assertPropertyExists(data, "mScreenUpdateTime");
  assertPropertyExists(data, "mNormalizedCloesnessToObject");
  assertPropertyExists(data, "mObjectIsWithinRange");
  assertPropertyExists(data, "mBeepDelayMax");
  assertPropertyExists(data, "mBeepDelayMin");
  assertPropertyExists(data, "mDetectionRange");
  assertPropertyExists(data, "mUpdateClosestObjectTime");
  assertPropertyExists(data, "mScannableDescriptors");
  assertPropertyExists(data, "mShouldBeepEvenIfNoObject");

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
