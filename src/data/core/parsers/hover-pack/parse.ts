import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/data/core/parsers";
import {
  parseBoolean,
  parseNumber,
  parseHoverMode,
  parsePoint3D,
} from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mCurrentPlayerVelocity"));
  assert(Object.hasOwn(data, "mCurrentMouseDelta"));
  assert(Object.hasOwn(data, "mCurrentBatteryPowerLevel"));
  assert(Object.hasOwn(data, "mHoverSpeed"));
  assert(Object.hasOwn(data, "mHoverAccelerationSpeed"));
  assert(Object.hasOwn(data, "mHoverSprintMultiplier"));
  assert(Object.hasOwn(data, "mHoverFriction"));
  assert(Object.hasOwn(data, "mJumpKeyHoldActivationTime"));
  assert(Object.hasOwn(data, "mFallSpeedLimitWhenPowered"));
  assert(Object.hasOwn(data, "mPowerConnectionSearchRadius"));
  assert(Object.hasOwn(data, "mPowerConnectionSearchTickRate"));
  assert(Object.hasOwn(data, "mPowerConnectionDisconnectionTime"));
  assert(Object.hasOwn(data, "mPowerCapacity"));
  assert(Object.hasOwn(data, "mPowerDrainRate"));
  assert(Object.hasOwn(data, "mPowerConsumption"));
  assert(Object.hasOwn(data, "mCurrentPowerLevel"));
  assert(Object.hasOwn(data, "mRangeWarningNormalizedDistanceThreshold"));
  assert(Object.hasOwn(data, "mCurrentHoverMode"));
  assert(Object.hasOwn(data, "mHasConnection"));
  assert(Object.hasOwn(data, "mShouldAutomaticallyHoverWhenConnected"));
  assert(Object.hasOwn(data, "mCrouchHoverCancelTime"));
  assert(Object.hasOwn(data, "mCharacterUseDistanceWhenActive"));
  assert(Object.hasOwn(data, "mActiveNoiseFrequency"));
  assert(Object.hasOwn(data, "mCurrentConnectionLocation"));

  return {
    ...base,
    mCurrentPlayerVelocity: parseNumber(data.mCurrentPlayerVelocity),
    mCurrentMouseDelta: parseNumber(data.mCurrentMouseDelta),
    mCurrentBatteryPowerLevel: parseNumber(data.mCurrentBatteryPowerLevel),
    mHoverSpeed: parseNumber(data.mHoverSpeed),
    mHoverAccelerationSpeed: parseNumber(data.mHoverAccelerationSpeed),
    mHoverSprintMultiplier: parseNumber(data.mHoverSprintMultiplier),
    mHoverFriction: parseNumber(data.mHoverFriction),
    mJumpKeyHoldActivationTime: parseNumber(data.mJumpKeyHoldActivationTime),
    mFallSpeedLimitWhenPowered: parseNumber(data.mFallSpeedLimitWhenPowered),
    mPowerConnectionSearchRadius: parseNumber(
      data.mPowerConnectionSearchRadius,
    ),
    mPowerConnectionSearchTickRate: parseNumber(
      data.mPowerConnectionSearchTickRate,
    ),
    mPowerConnectionDisconnectionTime: parseNumber(
      data.mPowerConnectionDisconnectionTime,
    ),
    mPowerCapacity: parseNumber(data.mPowerCapacity),
    mPowerDrainRate: parseNumber(data.mPowerDrainRate),
    mPowerConsumption: parseNumber(data.mPowerConsumption),
    mCurrentPowerLevel: parseNumber(data.mCurrentPowerLevel),
    mRangeWarningNormalizedDistanceThreshold: parseNumber(
      data.mRangeWarningNormalizedDistanceThreshold,
    ),
    mCurrentHoverMode: parseHoverMode(data.mCurrentHoverMode),
    mHasConnection: parseBoolean(data.mHasConnection),
    mShouldAutomaticallyHoverWhenConnected: parseBoolean(
      data.mShouldAutomaticallyHoverWhenConnected,
    ),
    mCrouchHoverCancelTime: parseNumber(data.mCrouchHoverCancelTime),
    mCharacterUseDistanceWhenActive: parseNumber(
      data.mCharacterUseDistanceWhenActive,
    ),
    mActiveNoiseFrequency: parseNumber(data.mActiveNoiseFrequency),
    mCurrentConnectionLocation: parsePoint3D(data.mCurrentConnectionLocation),
  };
}
