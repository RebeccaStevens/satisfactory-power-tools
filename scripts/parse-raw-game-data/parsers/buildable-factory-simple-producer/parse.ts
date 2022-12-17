import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parseGameEvent,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mTimeToProduceItem"));
  assert(Object.hasOwn(data, "mEventType"));

  return {
    ...buildableBuilding,
    mTimeToProduceItem: parseNumber(data.mTimeToProduceItem),
    mEventType: parseGameEvent(data.mEventType),
  };
}
