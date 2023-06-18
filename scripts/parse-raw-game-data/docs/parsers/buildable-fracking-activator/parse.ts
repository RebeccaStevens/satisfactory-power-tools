import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBaseBuildableFracking } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const baseBuildableFracking = parseBaseBuildableFracking(data);

  assertPropertyExists(data, "mActivationStartupTime");
  assertPropertyExists(data, "mActivationStartupTimer");
  assertPropertyExists(data, "mSatelliteActivationComplete");
  assertPropertyExists(data, "mSatelliteNodeCount");
  assertPropertyExists(data, "mConnectedExtractorCount");
  assertPropertyExists(data, "mDefaultPotentialExtractionPerMinute");

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
