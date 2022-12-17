import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mRadius"));
  assert(Object.hasOwn(data, "mFluidBoxVolume"));
  assert(Object.hasOwn(data, "mPipeConnections"));

  return {
    ...buildableBuilding,
    mRadius: parseNumber(data.mRadius),
    mFluidBoxVolume: parseNumber(data.mFluidBoxVolume),
    mPipeConnections: parsePipeConnections(data.mPipeConnections),
  };
}
