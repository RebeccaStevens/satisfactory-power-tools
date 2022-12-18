import type { BaseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = BaseBuildable & {
  mSize: number;
  mHeight: number;
  mIsInverted: boolean;
};
