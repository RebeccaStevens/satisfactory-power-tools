import type { Buildable } from "~/data/core/parsers";
import type { PowerConnection, PowerPoleType } from "~/data/core/types";

export type Data = Buildable & {
  mPowerConnections: Set<PowerConnection>;
  mPowerPoleType: PowerPoleType;
  mHasPower: boolean;
};
