import type { BaseBuildableFracking } from "~/scripts/parse-raw-game-data/parsers";
import type { PipeConnection } from "~/scripts/parse-raw-game-data/types";

export type Data = BaseBuildableFracking & {
  mExtractStartupTime: number;
  mExtractStartupTimer: number;
  mExtractCycleTime: number;
  mItemsPerCycle: number;
  mPipeOutputConnections: Array<PipeConnection>;
  mReplicatedFlowRate: number;
};
