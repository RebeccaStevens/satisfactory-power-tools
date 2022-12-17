import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";

export type Data = Buildable & {
  mSize: number;
  mDefaultLength: number;
  mMaxLength: number;
  mLength: number;
};
