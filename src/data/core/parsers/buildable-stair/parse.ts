import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseNumber, parseStairDirection } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mStairDirection"));
  assert(Object.hasOwn(data, "mHeight"));
  assert(Object.hasOwn(data, "mSize"));

  return {
    ...buildable,
    mStairDirection: parseStairDirection(data.mStairDirection),
    mHeight: parseNumber(data.mHeight),
    mSize: parseNumber(data.mSize),
  };
}
