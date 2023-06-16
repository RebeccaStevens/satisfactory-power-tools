import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = Buildable & {
  mWidth: number;
  mMeshHeight: number;
  mMaxSegmentCount: number;
  mNumSegments: number;
  // "mLadderMeshes": "",
};
