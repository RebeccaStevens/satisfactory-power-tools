import assert from "node:assert/strict";

import { parseWeapon } from "~/data/core/parsers";
import { parseNumber, parseBoolean } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const weapon = parseWeapon(data);

  assert(Object.hasOwn(data, "mRadialMenuShowUpTime"));
  assert(Object.hasOwn(data, "mIsPendingExecuteFire"));
  assert(Object.hasOwn(data, "mMaxChargeTime"));
  assert(Object.hasOwn(data, "mMaxThrowForce"));
  assert(Object.hasOwn(data, "mMinThrowForce"));
  assert(Object.hasOwn(data, "mDelayBetweenSecondaryTriggers"));

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
