import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseNumber,
  parseHoverMode,
  parsePoint3D,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseConsumableEquipment(data);

  assert("mCurrentPlayerVelocity" in data);
  assert("mCurrentMouseDelta" in data);
  assert("mCurrentBatteryPowerLevel" in data);
  assert("mHoverSpeed" in data);
  assert("mHoverAccelerationSpeed" in data);
  assert("mHoverSprintMultiplier" in data);
  assert("mHoverFriction" in data);
  assert("mJumpKeyHoldActivationTime" in data);
  assert("mFallSpeedLimitWhenPowered" in data);
  assert("mPowerConnectionSearchRadius" in data);
  assert("mPowerConnectionSearchTickRate" in data);
  assert("mPowerConnectionDisconnectionTime" in data);
  assert("mPowerCapacity" in data);
  assert("mPowerDrainRate" in data);
  assert("mPowerConsumption" in data);
  assert("mCurrentPowerLevel" in data);
  assert("mRangeWarningNormalizedDistanceThreshold" in data);
  assert("mCurrentHoverMode" in data);
  assert("mHasConnection" in data);
  assert("mShouldAutomaticallyHoverWhenConnected" in data);
  assert("mCrouchHoverCancelTime" in data);
  assert("mCharacterUseDistanceWhenActive" in data);
  assert("mActiveNoiseFrequency" in data);
  assert("mCurrentConnectionLocation" in data);

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
