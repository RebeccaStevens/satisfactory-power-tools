import assert from "node:assert/strict";

import { parseBaseBuildableFracking } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const baseBuildableFracking = parseBaseBuildableFracking(data);

  assert("mActivationStartupTime" in data);
  assert("mActivationStartupTimer" in data);
  assert("mSatelliteActivationComplete" in data);
  assert("mSatelliteNodeCount" in data);
  assert("mConnectedExtractorCount" in data);
  assert("mDefaultPotentialExtractionPerMinute" in data);

  return {
    ...baseBuildableFracking,
    mActivationStartupTime: parseNumber(data.mActivationStartupTime),
    mActivationStartupTimer: parseNumber(data.mActivationStartupTimer),
    mSatelliteActivationComplete: parseBoolean(
      data.mSatelliteActivationComplete,
    ),
    mSatelliteNodeCount: parseNumber(data.mSatelliteNodeCount),
    mConnectedExtractorCount: parseNumber(data.mConnectedExtractorCount),
    mDefaultPotentialExtractionPerMinute: parseNumber(
      data.mDefaultPotentialExtractionPerMinute,
    ),
  };
}
