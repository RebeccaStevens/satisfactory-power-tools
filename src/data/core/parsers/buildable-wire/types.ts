import type { Buildable } from "~/data/core/parsers";
import type { WireConnection } from "~/data/core/types";

export type Data = Buildable & {
  mMaxLength: number;
  mLengthPerCost: number;
  mConnections: Set<WireConnection>;
};
