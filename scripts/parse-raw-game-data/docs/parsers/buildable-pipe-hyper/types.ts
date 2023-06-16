import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type Point3D, type Spline } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mExitOffset: Point3D;
  mMeshLength: number;
  mSplineData: Spline;
};
