import { type Weapon } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = Weapon & {
  mRadialMenuShowUpTime: number;
  mIsPendingExecuteFire: boolean;
  mMaxChargeTime: number;
  mMaxThrowForce: number;
  mMinThrowForce: number;
  mDelayBetweenSecondaryTriggers: number;
};
