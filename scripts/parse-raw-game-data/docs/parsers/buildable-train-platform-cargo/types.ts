import type { BuildableTrainPlatformEmpty } from "~/scripts/parse-raw-game-data/docs/parsers";
import type {
  PipeConnection,
  BeltConnection,
  FreightCargoType,
} from "~/scripts/parse-raw-game-data/types";

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
  mStorageInputConnections: BeltConnection[];
  mPipeInputConnections: PipeConnection[];
  mPipeOutputConnections: PipeConnection[];
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
