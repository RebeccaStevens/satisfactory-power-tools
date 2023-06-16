import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type PowerConnection,
  type PowerPoleType,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mPowerConnections: PowerConnection[];
  mPowerPoleType: PowerPoleType;
  mHasPower: boolean;
};
