import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type {
  PipeConnection,
  ResourceForm,
  ExtractorType,
} from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mExtractStartupTime: number;
  mExtractStartupTimer: number;
  mExtractCycleTime: number;
  mItemsPerCycle: number;
  mPipeOutputConnections: Array<PipeConnection>;
  mReplicatedFlowRate: number;
  mAllowedResourceForms: Array<ResourceForm>;
  mOnlyAllowCertainResources: boolean;
  mAllowedResources: Array<string>;
  mExtractorTypeName: ExtractorType | null;
  mTryFindMissingResource: boolean;
};
