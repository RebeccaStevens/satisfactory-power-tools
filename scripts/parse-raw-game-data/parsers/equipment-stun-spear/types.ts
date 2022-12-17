import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/parsers";

export type Data = ConsumableEquipment & {
  mSecondSwingMaxTime: number;
  mSecondSwingCooldDownTime: number;
  mAttackDistance: number;
  mAttackSweepRadius: number;
};
