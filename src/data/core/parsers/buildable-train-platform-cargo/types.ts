import type { BuildableTrainPlatformEmpty } from "~/data/core/parsers";
import type {
  PipeConnection,
  BeltConnection,
  FreightCargoType,
} from "~/data/core/types";

export type Data = BuildableTrainPlatformEmpty & {
  mFreightCargoType: FreightCargoType;
  mStorageSizeX: number;
  mStorageSizeY: number;
  mCanUnloadAny: boolean;
  mIsFullUnload: boolean;
  mCanLoadAny: boolean;
  mIsFullLoad: boolean;
  mTimeToCompleteLoad: number;
  mTimeToSwapLoadVisibility: number;
  mTimeToCompleteUnload: number;
  mTimeToSwapUnloadVisibility: number;
  mWaitForConditionUpdatePeriod: number;
  mStorageInputConnections: Set<BeltConnection>;
  mPipeInputConnections: Set<PipeConnection>;
  mPipeOutputConnections: Set<PipeConnection>;
  // mDockingRuleSet: "(DockForDuration=15.000000)";
  // mLoadItemFilter: "";
  // mUnloadItemFilter: "";
  mHasFullyLoadUnloadRule: boolean;
  mDockForDuration: number;
  mMustDockForDuration: boolean;
  mCurrentDockForDuration: number;
  mHasAnyRelevantStacksToMove: boolean;
  mAllowDepartureNoValidItemsToTransfer: boolean;
  mShouldExecuteLoadOrUnload: boolean;
  mRanCompleteBeforeNone: boolean;
  mTimeSinceLastLoadTransferUpdate: number;
  mTimeSinceLastUnloadTransferUpdate: number;
  mSmoothedLoadRate: number;
  mSmoothedUnloadRate: number;
  mReplicatedOutflowRate: number;
  mReplicatedInflowRate: number;
};
