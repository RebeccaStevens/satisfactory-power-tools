import assert from "node:assert/strict";

import { parseWeapon } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const weapon = parseWeapon(data);

  assert("mRadialMenuShowUpTime" in data);
  assert("mIsPendingExecuteFire" in data);
  assert("mMaxChargeTime" in data);
  assert("mMaxThrowForce" in data);
  assert("mMinThrowForce" in data);
  assert("mDelayBetweenSecondaryTriggers" in data);

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
