import type { Buildable } from "~/data/core/parsers";
import type { Spline } from "~/data/core/types";

export type Data = Buildable & {
  mCustomSkins: Set<string>;
  mMeshLength: number;
  mSplineData: Spline;
  mSpeed: number;
  mItems: Set<string>;
};
