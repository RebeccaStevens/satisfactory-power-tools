import type { Buildable } from "~/data/core/parsers";
import type { DirectionBooleanMap } from "~/data/core/types";

export type Data = Buildable & {
  mWidth: number;
  mDepth: number;
  mHeight: number;
  mElevation: number;
  mIsFrame: boolean;
  mDisableSnapOn: DirectionBooleanMap;
};
