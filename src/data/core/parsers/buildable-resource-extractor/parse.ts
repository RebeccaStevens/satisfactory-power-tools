import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/data/core/parsers";
import {
  parseBoolean,
  parseClasses,
  parseExtractorType,
  parseNumber,
  parsePipeConnections,
  parseResourceForms,
} from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mExtractStartupTime"));
  assert(Object.hasOwn(data, "mExtractStartupTimer"));
  assert(Object.hasOwn(data, "mExtractCycleTime"));
  assert(Object.hasOwn(data, "mItemsPerCycle"));
  assert(Object.hasOwn(data, "mPipeOutputConnections"));
  assert(Object.hasOwn(data, "mReplicatedFlowRate"));
  assert(Object.hasOwn(data, "mAllowedResourceForms"));
  assert(Object.hasOwn(data, "mOnlyAllowCertainResources"));
  assert(Object.hasOwn(data, "mAllowedResources"));
  assert(Object.hasOwn(data, "mExtractorTypeName"));
  assert(Object.hasOwn(data, "mTryFindMissingResource"));

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
