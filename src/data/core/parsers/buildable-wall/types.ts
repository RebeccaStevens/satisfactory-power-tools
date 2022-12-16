import type { BaseBuildable } from "~/data/core/parsers";
import type { WallType } from "~/data/core/types";

export type Data = BaseBuildable & {
  mWidth: number;
  mHeight: number;
  mElevation: number;
  mAngularDepth: number;
  mWallType: WallType;
  mAngledVariants: Set<string>;
};
