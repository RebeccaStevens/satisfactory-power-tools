import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableTrainPlatformEmpty } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBeltConnections,
  parsePipeConnections,
  parseFreightCargoType,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableTrainPlatformEmpty = parseBuildableTrainPlatformEmpty(data);

  assertPropertyExists(data, "mFreightCargoType");
  assertPropertyExists(data, "mStorageSizeX");
  assertPropertyExists(data, "mStorageSizeY");
  assertPropertyExists(data, "mCanUnloadAny");
  assertPropertyExists(data, "mIsFullUnload");
  assertPropertyExists(data, "mCanLoadAny");
  assertPropertyExists(data, "mIsFullLoad");
  assertPropertyExists(data, "mTimeToCompleteLoad");
  assertPropertyExists(data, "mTimeToSwapLoadVisibility");
  assertPropertyExists(data, "mTimeToCompleteUnload");
  assertPropertyExists(data, "mTimeToSwapUnloadVisibility");
  assertPropertyExists(data, "mWaitForConditionUpdatePeriod");
  assertPropertyExists(data, "mStorageInputConnections");
  assertPropertyExists(data, "mPipeInputConnections");
  assertPropertyExists(data, "mPipeOutputConnections");
  assertPropertyExists(data, "mHasFullyLoadUnloadRule");
  assertPropertyExists(data, "mDockForDuration");
  assertPropertyExists(data, "mMustDockForDuration");
  assertPropertyExists(data, "mCurrentDockForDuration");
  assertPropertyExists(data, "mHasAnyRelevantStacksToMove");
  assertPropertyExists(data, "mAllowDepartureNoValidItemsToTransfer");
  assertPropertyExists(data, "mShouldExecuteLoadOrUnload");
  assertPropertyExists(data, "mRanCompleteBeforeNone");
  assertPropertyExists(data, "mTimeSinceLastLoadTransferUpdate");
  assertPropertyExists(data, "mTimeSinceLastUnloadTransferUpdate");
  assertPropertyExists(data, "mSmoothedLoadRate");
  assertPropertyExists(data, "mSmoothedUnloadRate");
  assertPropertyExists(data, "mReplicatedOutflowRate");
  assertPropertyExists(data, "mReplicatedInflowRate");

  return {
    ...buildableTrainPlatformEmpty,
    mFreightCargoType: parseFreightCargoType(data.mFreightCargoType),
    mStorageSizeX: parseNumber(data.mStorageSizeX),
    mStorageSizeY: parseNumber(data.mStorageSizeY),
    mCanUnloadAny: parseBoolean(data.mCanUnloadAny),
    mIsFullUnload: parseBoolean(data.mIsFullUnload),
    mCanLoadAny: parseBoolean(data.mCanLoadAny),
    mIsFullLoad: parseBoolean(data.mIsFullLoad),
    mTimeToCompleteLoad: parseNumber(data.mTimeToCompleteLoad),
    mTimeToSwapLoadVisibility: parseNumber(data.mTimeToSwapLoadVisibility),
    mTimeToCompleteUnload: parseNumber(data.mTimeToCompleteUnload),
    mTimeToSwapUnloadVisibility: parseNumber(data.mTimeToSwapUnloadVisibility),
    mWaitForConditionUpdatePeriod: parseNumber(
      data.mWaitForConditionUpdatePeriod,
    ),
    mStorageInputConnections: parseBeltConnections(
      data.mStorageInputConnections,
    ),
    mPipeInputConnections: parsePipeConnections(data.mPipeInputConnections),
    mPipeOutputConnections: parsePipeConnections(data.mPipeOutputConnections),
    mHasFullyLoadUnloadRule: parseBoolean(data.mHasFullyLoadUnloadRule),
    mDockForDuration: parseNumber(data.mDockForDuration),
    mMustDockForDuration: parseBoolean(data.mMustDockForDuration),
    mCurrentDockForDuration: parseNumber(data.mCurrentDockForDuration),
    mHasAnyRelevantStacksToMove: parseBoolean(data.mHasAnyRelevantStacksToMove),
    mAllowDepartureNoValidItemsToTransfer: parseBoolean(
      data.mAllowDepartureNoValidItemsToTransfer,
    ),
    mShouldExecuteLoadOrUnload: parseBoolean(data.mShouldExecuteLoadOrUnload),
    mRanCompleteBeforeNone: parseBoolean(data.mRanCompleteBeforeNone),
    mTimeSinceLastLoadTransferUpdate: parseNumber(
      data.mTimeSinceLastLoadTransferUpdate,
    ),
    mTimeSinceLastUnloadTransferUpdate: parseNumber(
      data.mTimeSinceLastUnloadTransferUpdate,
    ),
    mSmoothedLoadRate: parseNumber(data.mSmoothedLoadRate),
    mSmoothedUnloadRate: parseNumber(data.mSmoothedUnloadRate),
    mReplicatedOutflowRate: parseNumber(data.mReplicatedOutflowRate),
    mReplicatedInflowRate: parseNumber(data.mReplicatedInflowRate),
  };
}
