import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mSize"));
  assert(Object.hasOwn(data, "mDefaultLength"));
  assert(Object.hasOwn(data, "mMaxLength"));
  assert(Object.hasOwn(data, "mLength"));

  return {
    ...buildable,
    mSize: parseNumber(data.mSize),
    mDefaultLength: parseNumber(data.mDefaultLength),
    mMaxLength: parseNumber(data.mMaxLength),
    mLength: parseNumber(data.mLength),
  };
}
