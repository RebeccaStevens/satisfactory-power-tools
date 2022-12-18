import type { BaseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { WallType } from "~/scripts/parse-raw-game-data/types";

export type Data = BaseBuildable & {
  mWidth: number;
  mHeight: number;
  mElevation: number;
  mAngularDepth: number;
  mWallType: WallType;
  mAngledVariants: string[];
};
