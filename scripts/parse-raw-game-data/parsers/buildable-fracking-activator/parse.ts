import assert from "node:assert/strict";

import { parseBaseBuildableFracking } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const baseBuildableFracking = parseBaseBuildableFracking(data);

  assert(Object.hasOwn(data, "mActivationStartupTime"));
  assert(Object.hasOwn(data, "mActivationStartupTimer"));
  assert(Object.hasOwn(data, "mSatelliteActivationComplete"));
  assert(Object.hasOwn(data, "mSatelliteNodeCount"));
  assert(Object.hasOwn(data, "mConnectedExtractorCount"));
  assert(Object.hasOwn(data, "mDefaultPotentialExtractionPerMinute"));

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
