import type { BaseBuildable } from "~/data/core/parsers";
import type { Point3D } from "~/data/core/types";

export type Data = BaseBuildable & {
  mTerminalDistanceFromEdge: number;
  mTerminalHalfDepth: number;
  mDimensions: Point3D;
};
