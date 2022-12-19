import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = ConsumableEquipment & {
  mIsWorking: boolean;
  mHasNegatedDamage: boolean;
  mDamageNegated: number;
  mFilterDuration: number;
  mCountdown: number;
  mDisableEffectTimer: number;
};
