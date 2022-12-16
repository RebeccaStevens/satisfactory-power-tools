import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parsePoint3D, parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mTerminalDistanceFromEdge"));
  assert(Object.hasOwn(data, "mTerminalHalfDepth"));
  assert(Object.hasOwn(data, "mDimensions"));

  return {
    ...buildable,
    mTerminalDistanceFromEdge: parseNumber(data.mTerminalDistanceFromEdge),
    mTerminalHalfDepth: parseNumber(data.mTerminalHalfDepth),
    mDimensions: parsePoint3D(data.mDimensions),
  };
}
