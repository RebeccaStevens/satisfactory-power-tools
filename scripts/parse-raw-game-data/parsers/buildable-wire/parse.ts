import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseWireConnections,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mMaxLength"));
  assert(Object.hasOwn(data, "mLengthPerCost"));
  assert(Object.hasOwn(data, "mConnections"));

  return {
    ...buildable,
    mMaxLength: parseNumber(data.mMaxLength),
    mLengthPerCost: parseNumber(data.mLengthPerCost),
    mConnections: parseWireConnections(data.mConnections),
  };
}
