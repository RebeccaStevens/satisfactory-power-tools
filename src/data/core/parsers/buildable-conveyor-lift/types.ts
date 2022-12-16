import type { Buildable } from "~/data/core/parsers";
import type { Transform3D } from "~/data/core/types";

export type Data = Buildable & {
  mMeshHeight: number;
  mTopTransform: Transform3D;
  mIsReversed: boolean;
  mSpeed: number;
  mItems: Set<string>;
};
