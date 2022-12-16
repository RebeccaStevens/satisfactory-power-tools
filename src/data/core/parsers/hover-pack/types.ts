import type { ConsumableEquipment } from "~/data/core/parsers";
import type { HoverMode, Point3D } from "~/data/core/types";

export type Data = ConsumableEquipment & {
  mCurrentPlayerVelocity: number;
  mCurrentMouseDelta: number;
  mCurrentBatteryPowerLevel: number;
  mHoverSpeed: number;
  mHoverAccelerationSpeed: number;
  mHoverSprintMultiplier: number;
  mHoverFriction: number;
  mJumpKeyHoldActivationTime: number;
  mFallSpeedLimitWhenPowered: number;
  mPowerConnectionSearchRadius: number;
  mPowerConnectionSearchTickRate: number;
  mPowerConnectionDisconnectionTime: number;
  mPowerCapacity: number;
  mPowerDrainRate: number;
  mPowerConsumption: number;
  mCurrentPowerLevel: number;
  mRangeWarningNormalizedDistanceThreshold: number;
  mCurrentHoverMode: HoverMode;
  mHasConnection: boolean;
  mShouldAutomaticallyHoverWhenConnected: boolean;
  mCrouchHoverCancelTime: number;
  mCharacterUseDistanceWhenActive: number;
  mActiveNoiseFrequency: number;
  mCurrentConnectionLocation: Point3D;
};
