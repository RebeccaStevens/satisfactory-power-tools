import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mExtractStartupTime");
  assertPropertyExists(data, "mExtractStartupTimer");
  assertPropertyExists(data, "mExtractCycleTime");
  assertPropertyExists(data, "mItemsPerCycle");
  assertPropertyExists(data, "mPipeOutputConnections");
  assertPropertyExists(data, "mReplicatedFlowRate");
  assertPropertyExists(data, "mAllowedResourceForms");
  assertPropertyExists(data, "mOnlyAllowCertainResources");
  assertPropertyExists(data, "mAllowedResources");
  assertPropertyExists(data, "mExtractorTypeName");
  assertPropertyExists(data, "mTryFindMissingResource");

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
