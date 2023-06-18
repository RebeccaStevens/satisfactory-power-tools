import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBaseBuildableFracking } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const baseBuildableFracking = parseBaseBuildableFracking(data);

  assertPropertyExists(data, "mExtractStartupTime");
  assertPropertyExists(data, "mExtractStartupTimer");
  assertPropertyExists(data, "mExtractCycleTime");
  assertPropertyExists(data, "mItemsPerCycle");
  assertPropertyExists(data, "mPipeOutputConnections");
  assertPropertyExists(data, "mReplicatedFlowRate");

  return {
    ...baseBuildableFracking,
    mExtractStartupTime: parseNumber(data.mExtractStartupTime),
    mExtractStartupTimer: parseNumber(data.mExtractStartupTimer),
    mExtractCycleTime: parseNumber(data.mExtractCycleTime),
    mItemsPerCycle: parseNumber(data.mItemsPerCycle),
    mPipeOutputConnections: parsePipeConnections(data.mPipeOutputConnections),
    mReplicatedFlowRate: parseNumber(data.mReplicatedFlowRate),
  };
}
