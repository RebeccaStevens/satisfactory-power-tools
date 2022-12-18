import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";

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
