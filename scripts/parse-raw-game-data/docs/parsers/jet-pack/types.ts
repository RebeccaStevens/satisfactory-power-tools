import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/types";

export type Data = ConsumableEquipment & {
  mDefaultAirControl: number;
  mRTPCInterval: number;
  mThrustCooldown: number;
  mCurrentFuel: number;
  mIsThrusting: boolean;
  mFuelTypes: string[];
};
