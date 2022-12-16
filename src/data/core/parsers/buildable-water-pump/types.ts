import type { BuildableResourceExtractor } from "~/data/core/parsers";
import type { Point3D } from "~/data/core/types";

export type Data = BuildableResourceExtractor & {
  mMinimumDepthForPlacement: number;
  mDepthTraceOriginOffset: Point3D;
};
