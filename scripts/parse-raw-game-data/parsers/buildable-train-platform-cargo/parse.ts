import assert from "node:assert/strict";

import { parseBuildableTrainPlatformEmpty } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parseBeltConnections,
  parsePipeConnections,
  parseFreightCargoType,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableTrainPlatformEmpty = parseBuildableTrainPlatformEmpty(data);

  assert(Object.hasOwn(data, "mFreightCargoType"));
  assert(Object.hasOwn(data, "mStorageSizeX"));
  assert(Object.hasOwn(data, "mStorageSizeY"));
  assert(Object.hasOwn(data, "mCanUnloadAny"));
  assert(Object.hasOwn(data, "mIsFullUnload"));
  assert(Object.hasOwn(data, "mCanLoadAny"));
  assert(Object.hasOwn(data, "mIsFullLoad"));
  assert(Object.hasOwn(data, "mTimeToCompleteLoad"));
  assert(Object.hasOwn(data, "mTimeToSwapLoadVisibility"));
  assert(Object.hasOwn(data, "mTimeToCompleteUnload"));
  assert(Object.hasOwn(data, "mTimeToSwapUnloadVisibility"));
  assert(Object.hasOwn(data, "mWaitForConditionUpdatePeriod"));
  assert(Object.hasOwn(data, "mStorageInputConnections"));
  assert(Object.hasOwn(data, "mPipeInputConnections"));
  assert(Object.hasOwn(data, "mPipeOutputConnections"));
  assert(Object.hasOwn(data, "mHasFullyLoadUnloadRule"));
  assert(Object.hasOwn(data, "mDockForDuration"));
  assert(Object.hasOwn(data, "mMustDockForDuration"));
  assert(Object.hasOwn(data, "mCurrentDockForDuration"));
  assert(Object.hasOwn(data, "mHasAnyRelevantStacksToMove"));
  assert(Object.hasOwn(data, "mAllowDepartureNoValidItemsToTransfer"));
  assert(Object.hasOwn(data, "mShouldExecuteLoadOrUnload"));
  assert(Object.hasOwn(data, "mRanCompleteBeforeNone"));
  assert(Object.hasOwn(data, "mTimeSinceLastLoadTransferUpdate"));
  assert(Object.hasOwn(data, "mTimeSinceLastUnloadTransferUpdate"));
  assert(Object.hasOwn(data, "mSmoothedLoadRate"));
  assert(Object.hasOwn(data, "mSmoothedUnloadRate"));
  assert(Object.hasOwn(data, "mReplicatedOutflowRate"));
  assert(Object.hasOwn(data, "mReplicatedInflowRate"));

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
