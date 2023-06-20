import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mMaxNumSortRules");
  assertPropertyExists(data, "mCurrentOutputIndex");
  assertPropertyExists(data, "mLastOutputIndex");
  assertPropertyExists(data, "mCurrentInventoryIndex");

  return {
    ...buildable,
    mMaxNumSortRules: parseNumber(data.mMaxNumSortRules),
    mCurrentOutputIndex: parseNumber(data.mCurrentOutputIndex),
    mLastOutputIndex: parseNumber(data.mLastOutputIndex),
    mCurrentInventoryIndex: parseNumber(data.mCurrentInventoryIndex),
  };
}
