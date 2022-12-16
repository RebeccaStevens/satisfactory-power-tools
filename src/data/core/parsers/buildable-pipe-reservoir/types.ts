import type { BuildableBuilding } from "~/data/core/parsers";
import type { PipeConnection } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mStackingHeight: number;
  mStorageCapacity: number;
  mPipeConnections: Set<PipeConnection>;
};
