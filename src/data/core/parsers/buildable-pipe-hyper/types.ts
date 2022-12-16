import type { Buildable } from "~/data/core/parsers";
import type { Point3D, Spline } from "~/data/core/types";

export type Data = Buildable & {
  mExitOffset: Point3D;
  mMeshLength: number;
  mSplineData: Spline;
};
