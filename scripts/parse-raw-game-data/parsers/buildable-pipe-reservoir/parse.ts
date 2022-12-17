import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mStackingHeight"));
  assert(Object.hasOwn(data, "mStorageCapacity"));
  assert(Object.hasOwn(data, "mPipeConnections"));

  return {
    ...buildableBuilding,
    mStackingHeight: parseNumber(data.mStackingHeight),
    mStorageCapacity: parseNumber(data.mStorageCapacity),
    mPipeConnections: parsePipeConnections(data.mPipeConnections),
  };
}
