import assert from "node:assert/strict";

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

  assert("mFreightCargoType" in data);
  assert("mStorageSizeX" in data);
  assert("mStorageSizeY" in data);
  assert("mCanUnloadAny" in data);
  assert("mIsFullUnload" in data);
  assert("mCanLoadAny" in data);
  assert("mIsFullLoad" in data);
  assert("mTimeToCompleteLoad" in data);
  assert("mTimeToSwapLoadVisibility" in data);
  assert("mTimeToCompleteUnload" in data);
  assert("mTimeToSwapUnloadVisibility" in data);
  assert("mWaitForConditionUpdatePeriod" in data);
  assert("mStorageInputConnections" in data);
  assert("mPipeInputConnections" in data);
  assert("mPipeOutputConnections" in data);
  assert("mHasFullyLoadUnloadRule" in data);
  assert("mDockForDuration" in data);
  assert("mMustDockForDuration" in data);
  assert("mCurrentDockForDuration" in data);
  assert("mHasAnyRelevantStacksToMove" in data);
  assert("mAllowDepartureNoValidItemsToTransfer" in data);
  assert("mShouldExecuteLoadOrUnload" in data);
  assert("mRanCompleteBeforeNone" in data);
  assert("mTimeSinceLastLoadTransferUpdate" in data);
  assert("mTimeSinceLastUnloadTransferUpdate" in data);
  assert("mSmoothedLoadRate" in data);
  assert("mSmoothedUnloadRate" in data);
  assert("mReplicatedOutflowRate" in data);
  assert("mReplicatedInflowRate" in data);

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
