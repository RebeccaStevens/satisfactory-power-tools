import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mWidth: number;
  mMeshHeight: number;
  mMaxSegmentCount: number;
  mNumSegments: number;
  // "mLadderMeshes": "",
};
