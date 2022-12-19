import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseClasses,
  parseExtractorType,
  parseNumber,
  parsePipeConnections,
  parseResourceForms,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mExtractStartupTime" in data);
  assert("mExtractStartupTimer" in data);
  assert("mExtractCycleTime" in data);
  assert("mItemsPerCycle" in data);
  assert("mPipeOutputConnections" in data);
  assert("mReplicatedFlowRate" in data);
  assert("mAllowedResourceForms" in data);
  assert("mOnlyAllowCertainResources" in data);
  assert("mAllowedResources" in data);
  assert("mExtractorTypeName" in data);
  assert("mTryFindMissingResource" in data);

  return {
    ...buildableBuilding,

    mExtractStartupTime: parseNumber(data.mExtractStartupTime),
    mExtractStartupTimer: parseNumber(data.mExtractStartupTimer),
    mExtractCycleTime: parseNumber(data.mExtractCycleTime),
    mItemsPerCycle: parseNumber(data.mItemsPerCycle),
    mPipeOutputConnections: parsePipeConnections(data.mPipeOutputConnections),
    mReplicatedFlowRate: parseNumber(data.mReplicatedFlowRate),
    mAllowedResourceForms: parseResourceForms(data.mAllowedResourceForms),
    mOnlyAllowCertainResources: parseBoolean(data.mOnlyAllowCertainResources),
    mAllowedResources: parseClasses(data.mAllowedResources),
    mExtractorTypeName: parseExtractorType(data.mExtractorTypeName),
    mTryFindMissingResource: parseBoolean(data.mTryFindMissingResource),
  };
}
