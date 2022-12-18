import type { Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { DirectionBooleanMap } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mWidth: number;
  mDepth: number;
  mHeight: number;
  mElevation: number;
  mIsFrame: boolean;
  mDisableSnapOn: DirectionBooleanMap;
};
