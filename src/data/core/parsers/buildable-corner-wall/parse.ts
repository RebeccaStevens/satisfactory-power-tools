import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseBoolean, parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mSize"));
  assert(Object.hasOwn(data, "mHeight"));
  assert(Object.hasOwn(data, "mIsInverted"));

  return {
    ...buildable,
    mSize: parseNumber(data.mSize),
    mHeight: parseNumber(data.mHeight),
    mIsInverted: parseBoolean(data.mIsInverted),
  };
}
