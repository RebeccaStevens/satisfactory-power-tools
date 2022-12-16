import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseNumber } from "~/data/core/utils";

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
