import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/data/core/parsers";
import { parseNumber, parseGameEvent } from "~/data/core/utils";

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
