import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseWireConnections, parseNumber } from "~/data/core/utils";

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
