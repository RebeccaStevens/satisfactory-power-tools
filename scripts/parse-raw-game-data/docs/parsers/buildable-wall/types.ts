import type { Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { WallType } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mWidth: number;
  mHeight: number;
  mElevation: number;
  mAngularDepth: number;
  mWallType: WallType;
  mAngledVariants: string[];
};
