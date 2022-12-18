import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/types";

export type Data = ConsumableEquipment & {
  mSprintSpeedFactor: number;
  mJumpSpeedFactor: number;
};
