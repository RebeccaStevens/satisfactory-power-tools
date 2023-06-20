import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "mCurrentPlayerVelocity");
  assertPropertyExists(data, "mCurrentMouseDelta");
  assertPropertyExists(data, "mCurrentBatteryPowerLevel");
  assertPropertyExists(data, "mHoverSpeed");
  assertPropertyExists(data, "mHoverAccelerationSpeed");
  assertPropertyExists(data, "mHoverSprintMultiplier");
  assertPropertyExists(data, "mHoverFriction");
  assertPropertyExists(data, "mJumpKeyHoldActivationTime");
  assertPropertyExists(data, "mFallSpeedLimitWhenPowered");
  assertPropertyExists(data, "mPowerConnectionSearchRadius");
  assertPropertyExists(data, "mPowerConnectionSearchTickRate");
  assertPropertyExists(data, "mPowerConnectionDisconnectionTime");
  assertPropertyExists(data, "mPowerCapacity");
  assertPropertyExists(data, "mPowerDrainRate");
  assertPropertyExists(data, "mPowerConsumption");
  assertPropertyExists(data, "mCurrentPowerLevel");
  assertPropertyExists(data, "mRangeWarningNormalizedDistanceThreshold");
  assertPropertyExists(data, "mCurrentHoverMode");
  assertPropertyExists(data, "mHasConnection");
  assertPropertyExists(data, "mShouldAutomaticallyHoverWhenConnected");
  assertPropertyExists(data, "mCrouchHoverCancelTime");
  assertPropertyExists(data, "mCharacterUseDistanceWhenActive");
  assertPropertyExists(data, "mActiveNoiseFrequency");
  assertPropertyExists(data, "mCurrentConnectionLocation");

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
