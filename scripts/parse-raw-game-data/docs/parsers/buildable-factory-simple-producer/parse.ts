import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseGameEvent,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mTimeToProduceItem" in data);
  assert("mEventType" in data);

  return {
    ...buildableBuilding,
    mTimeToProduceItem: parseNumber(data.mTimeToProduceItem),
    mEventType: parseGameEvent(data.mEventType),
  };
}
