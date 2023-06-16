import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type Transform3D } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mMeshHeight: number;
  mTopTransform: Transform3D;
  mIsReversed: boolean;
  mSpeed: number;
  mItems: string[];
};
