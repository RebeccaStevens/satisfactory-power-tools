import type { ConsumableEquipment } from "~/data/core/types";

export type Data = ConsumableEquipment & {
  mIsWorking: boolean;
  mHasNegatedDamage: boolean;
  mDamageNegated: number;
  mFilterDuration: number;
  mCountdown: number;
  mDisableEffectTimer: number;
};
