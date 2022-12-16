import type { Item } from "~/data/core/parsers";
import type { MinMax } from "~/data/core/types";

export type Data = Item & {
  mNumShots: MinMax<number>;
  mSpreadAngleDegrees: number;
};
