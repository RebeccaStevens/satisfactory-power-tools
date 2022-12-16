import type { ConsumableEquipment } from "~/data/core/types";

export type Data = ConsumableEquipment & {
  mDefaultAirControl: number;
  mRTPCInterval: number;
  mThrustCooldown: number;
  mCurrentFuel: number;
  mIsThrusting: boolean;
  mFuelTypes: Set<string>;
};
