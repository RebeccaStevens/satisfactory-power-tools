import type { Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { Spline } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mCustomSkins: string[];
  mMeshLength: number;
  mSplineData: Spline;
  mSpeed: number;
  mItems: string[];
};
