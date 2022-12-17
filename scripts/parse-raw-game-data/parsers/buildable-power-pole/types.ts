import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";
import type {
  PowerConnection,
  PowerPoleType,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mPowerConnections: Array<PowerConnection>;
  mPowerPoleType: PowerPoleType;
  mHasPower: boolean;
};
