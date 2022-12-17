import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/types";

export type Data = ConsumableEquipment & {
  mTerminalVelocityZ: number;
  mIsDeployed: boolean;
};
