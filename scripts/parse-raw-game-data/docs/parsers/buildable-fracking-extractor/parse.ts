import assert from "node:assert/strict";

import { parseBaseBuildableFracking } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const baseBuildableFracking = parseBaseBuildableFracking(data);

  assert("mExtractStartupTime" in data);
  assert("mExtractStartupTimer" in data);
  assert("mExtractCycleTime" in data);
  assert("mItemsPerCycle" in data);
  assert("mPipeOutputConnections" in data);
  assert("mReplicatedFlowRate" in data);

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
