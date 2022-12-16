import type { ConsumableEquipment } from "~/data/core/types";

export type Data = ConsumableEquipment & {
  mTerminalVelocityZ: number;
  mIsDeployed: boolean;
};
