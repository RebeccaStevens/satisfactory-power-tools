import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mGrinderInterpDuration" in data);
  assert("mEngineInterpDuration" in data);
  assert("mProcessingTime" in data);
  assert("mProducingTimer" in data);

  return {
    ...buildableBuilding,
    mGrinderInterpDuration: parseNumber(data.mGrinderInterpDuration),
    mEngineInterpDuration: parseNumber(data.mEngineInterpDuration),
    mProcessingTime: parseNumber(data.mProcessingTime),
    mProducingTimer: parseNumber(data.mProducingTimer),
  };
}
