import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parsePoint3D, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mTerminalDistanceFromEdge" in data);
  assert("mTerminalHalfDepth" in data);
  assert("mDimensions" in data);

  return {
    ...buildable,
    mTerminalDistanceFromEdge: parseNumber(data.mTerminalDistanceFromEdge),
    mTerminalHalfDepth: parseNumber(data.mTerminalHalfDepth),
    mDimensions: parsePoint3D(data.mDimensions),
  };
}
