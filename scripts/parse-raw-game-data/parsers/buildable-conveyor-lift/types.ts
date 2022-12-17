import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";
import type { Transform3D } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mMeshHeight: number;
  mTopTransform: Transform3D;
  mIsReversed: boolean;
  mSpeed: number;
  mItems: Array<string>;
};
