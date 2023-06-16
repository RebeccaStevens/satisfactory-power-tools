import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mMaxNumSortRules" in data);
  assert("mCurrentOutputIndex" in data);
  assert("mLastOutputIndex" in data);
  assert("mCurrentInventoryIndex" in data);

  return {
    ...buildable,
    mMaxNumSortRules: parseNumber(data.mMaxNumSortRules),
    mCurrentOutputIndex: parseNumber(data.mCurrentOutputIndex),
    mLastOutputIndex: parseNumber(data.mLastOutputIndex),
    mCurrentInventoryIndex: parseNumber(data.mCurrentInventoryIndex),
  };
}
