import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mGrinderInterpDuration"));
  assert(Object.hasOwn(data, "mEngineInterpDuration"));
  assert(Object.hasOwn(data, "mProcessingTime"));
  assert(Object.hasOwn(data, "mProducingTimer"));

  return {
    ...buildableBuilding,
    mGrinderInterpDuration: parseNumber(data.mGrinderInterpDuration),
    mEngineInterpDuration: parseNumber(data.mEngineInterpDuration),
    mProcessingTime: parseNumber(data.mProcessingTime),
    mProducingTimer: parseNumber(data.mProducingTimer),
  };
}
