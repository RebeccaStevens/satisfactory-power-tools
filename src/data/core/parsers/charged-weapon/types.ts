import type { Weapon } from "~/data/core/parsers";

export type Data = Weapon & {
  mRadialMenuShowUpTime: number;
  mIsPendingExecuteFire: boolean;
  mMaxChargeTime: number;
  mMaxThrowForce: number;
  mMinThrowForce: number;
  mDelayBetweenSecondaryTriggers: number;
};
