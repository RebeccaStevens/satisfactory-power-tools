import { type ConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = ConsumableEquipment & {
  mSprintSpeedFactor: number;
  mJumpSpeedFactor: number;
};
