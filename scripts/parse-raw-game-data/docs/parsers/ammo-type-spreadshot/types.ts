import type { Item } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { MinMax } from "~/scripts/parse-raw-game-data/types";

export type Data = Item & {
  mNumShots: MinMax<number>;
  mSpreadAngleDegrees: number;
};
