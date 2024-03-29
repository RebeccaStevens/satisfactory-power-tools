import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = Buildable & {
  mHeight: number;
  mSelectedPoleVersion: number | false;
  mUseStaticHeight: boolean;
  mCanStack: boolean;
  mStackHeight: number;
};
