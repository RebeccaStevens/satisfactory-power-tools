import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseWeapon } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const weapon = parseWeapon(data);

  assertPropertyExists(data, "mRadialMenuShowUpTime");
  assertPropertyExists(data, "mIsPendingExecuteFire");
  assertPropertyExists(data, "mMaxChargeTime");
  assertPropertyExists(data, "mMaxThrowForce");
  assertPropertyExists(data, "mMinThrowForce");
  assertPropertyExists(data, "mDelayBetweenSecondaryTriggers");

  return {
    ...weapon,
    mRadialMenuShowUpTime: parseNumber(data.mRadialMenuShowUpTime),
    mIsPendingExecuteFire: parseBoolean(data.mIsPendingExecuteFire),
    mMaxChargeTime: parseNumber(data.mMaxChargeTime),
    mMaxThrowForce: parseNumber(data.mMaxThrowForce),
    mMinThrowForce: parseNumber(data.mMinThrowForce),
    mDelayBetweenSecondaryTriggers: parseNumber(
      data.mDelayBetweenSecondaryTriggers,
    ),
  };
}
