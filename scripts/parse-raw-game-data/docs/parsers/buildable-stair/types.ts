import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type StairDirection } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mStairDirection: StairDirection;
  mHeight: number;
  mSize: number;
};
