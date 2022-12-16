import type { BuildableBuilding } from "~/data/core/parsers";
import type {
  PipeConnection,
  ResourceForm,
  ExtractorType,
} from "~/data/core/types";

export type Data = BuildableBuilding & {
  mExtractStartupTime: number;
  mExtractStartupTimer: number;
  mExtractCycleTime: number;
  mItemsPerCycle: number;
  mPipeOutputConnections: Set<PipeConnection>;
  mReplicatedFlowRate: number;
  mAllowedResourceForms: Set<ResourceForm>;
  mOnlyAllowCertainResources: boolean;
  mAllowedResources: Set<string>;
  mExtractorTypeName: ExtractorType | null;
  mTryFindMissingResource: boolean;
};
