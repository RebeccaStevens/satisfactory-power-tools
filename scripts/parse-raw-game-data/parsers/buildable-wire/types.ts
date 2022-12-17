import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";
import type { WireConnection } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mMaxLength: number;
  mLengthPerCost: number;
  mConnections: Array<WireConnection>;
};
