import type { BaseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import type { Point3D } from "~/scripts/parse-raw-game-data/types";

export type Data = BaseBuildable & {
  mTerminalDistanceFromEdge: number;
  mTerminalHalfDepth: number;
  mDimensions: Point3D;
};
