import type { ConsumableEquipment } from "~/data/core/parsers";

export type Data = ConsumableEquipment & {
  mSecondSwingMaxTime: number;
  mSecondSwingCooldDownTime: number;
  mAttackDistance: number;
  mAttackSweepRadius: number;
};
