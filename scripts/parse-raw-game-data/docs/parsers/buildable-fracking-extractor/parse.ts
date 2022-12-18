import assert from "node:assert/strict";

import { parseBaseBuildableFracking } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const baseBuildableFracking = parseBaseBuildableFracking(data);

  assert(Object.hasOwn(data, "mExtractStartupTime"));
  assert(Object.hasOwn(data, "mExtractStartupTimer"));
  assert(Object.hasOwn(data, "mExtractCycleTime"));
  assert(Object.hasOwn(data, "mItemsPerCycle"));
  assert(Object.hasOwn(data, "mPipeOutputConnections"));
  assert(Object.hasOwn(data, "mReplicatedFlowRate"));

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
