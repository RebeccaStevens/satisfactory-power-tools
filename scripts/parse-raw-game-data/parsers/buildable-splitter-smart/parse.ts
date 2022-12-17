import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mMaxNumSortRules"));
  assert(Object.hasOwn(data, "mCurrentOutputIndex"));
  assert(Object.hasOwn(data, "mLastOutputIndex"));
  assert(Object.hasOwn(data, "mCurrentInventoryIndex"));

  return {
    ...buildable,
    mMaxNumSortRules: parseNumber(data.mMaxNumSortRules),
    mCurrentOutputIndex: parseNumber(data.mCurrentOutputIndex),
    mLastOutputIndex: parseNumber(data.mLastOutputIndex),
    mCurrentInventoryIndex: parseNumber(data.mCurrentInventoryIndex),
  };
}
