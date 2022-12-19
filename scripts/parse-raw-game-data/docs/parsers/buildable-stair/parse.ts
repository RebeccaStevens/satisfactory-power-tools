import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseStairDirection,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mStairDirection" in data);
  assert("mHeight" in data);
  assert("mSize" in data);

  return {
    ...buildable,
    mStairDirection: parseStairDirection(data.mStairDirection),
    mHeight: parseNumber(data.mHeight),
    mSize: parseNumber(data.mSize),
  };
}
