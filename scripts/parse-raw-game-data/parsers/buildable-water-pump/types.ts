import type { BuildableResourceExtractor } from "~/scripts/parse-raw-game-data/parsers";
import type { Point3D } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableResourceExtractor & {
  mMinimumDepthForPlacement: number;
  mDepthTraceOriginOffset: Point3D;
};
