import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";
import type { Spline } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mCustomSkins: Array<string>;
  mMeshLength: number;
  mSplineData: Spline;
  mSpeed: number;
  mItems: Array<string>;
};
