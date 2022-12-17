import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";

export type Data = Buildable & {
  mLength: number;
  mVerticalAngle: number;
  mUseStaticHeight: boolean;
  mCanStack: boolean;
  mStackHeight: number;
};
