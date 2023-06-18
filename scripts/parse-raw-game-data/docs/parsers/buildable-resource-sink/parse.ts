import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mGrinderInterpDuration");
  assertPropertyExists(data, "mEngineInterpDuration");
  assertPropertyExists(data, "mProcessingTime");
  assertPropertyExists(data, "mProducingTimer");

  return {
    ...buildableBuilding,
    mGrinderInterpDuration: parseNumber(data.mGrinderInterpDuration),
    mEngineInterpDuration: parseNumber(data.mEngineInterpDuration),
    mProcessingTime: parseNumber(data.mProcessingTime),
    mProducingTimer: parseNumber(data.mProducingTimer),
  };
}
