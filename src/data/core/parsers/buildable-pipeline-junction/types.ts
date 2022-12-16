import type { BuildableBuilding } from "~/data/core/parsers";
import type { PipeConnection } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mRadius: number;
  mFluidBoxVolume: number;
  mPipeConnections: Set<PipeConnection>;
};
