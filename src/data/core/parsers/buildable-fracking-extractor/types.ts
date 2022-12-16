import type { BaseBuildableFracking } from "~/data/core/parsers";
import type { PipeConnection } from "~/data/core/types";

export type Data = BaseBuildableFracking & {
  mExtractStartupTime: number;
  mExtractStartupTimer: number;
  mExtractCycleTime: number;
  mItemsPerCycle: number;
  mPipeOutputConnections: Set<PipeConnection>;
  mReplicatedFlowRate: number;
};
