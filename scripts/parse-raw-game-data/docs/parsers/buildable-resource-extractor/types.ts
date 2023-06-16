import { type BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type PipeConnection,
  type ResourceForm,
  type ExtractorType,
} from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mExtractStartupTime: number;
  mExtractStartupTimer: number;
  mExtractCycleTime: number;
  mItemsPerCycle: number;
  mPipeOutputConnections: PipeConnection[];
  mReplicatedFlowRate: number;
  mAllowedResourceForms: ResourceForm[];
  mOnlyAllowCertainResources: boolean;
  mAllowedResources: string[];
  mExtractorTypeName: ExtractorType | null;
  mTryFindMissingResource: boolean;
};
