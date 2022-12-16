import type { ConsumableEquipment } from "~/data/core/types";

export type Data = ConsumableEquipment & {
  mSprintSpeedFactor: number;
  mJumpSpeedFactor: number;
};
