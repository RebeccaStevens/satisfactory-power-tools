import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parsePoint3D, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mTerminalDistanceFromEdge");
  assertPropertyExists(data, "mTerminalHalfDepth");
  assertPropertyExists(data, "mDimensions");

  return {
    ...buildable,
    mTerminalDistanceFromEdge: parseNumber(data.mTerminalDistanceFromEdge),
    mTerminalHalfDepth: parseNumber(data.mTerminalHalfDepth),
    mDimensions: parsePoint3D(data.mDimensions),
  };
}
