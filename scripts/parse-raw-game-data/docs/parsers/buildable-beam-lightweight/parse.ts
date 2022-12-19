import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mSize" in data);
  assert("mDefaultLength" in data);
  assert("mMaxLength" in data);
  assert("mLength" in data);

  return {
    ...buildable,
    mSize: parseNumber(data.mSize),
    mDefaultLength: parseNumber(data.mDefaultLength),
    mMaxLength: parseNumber(data.mMaxLength),
    mLength: parseNumber(data.mLength),
  };
}
