import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseStairDirection,
} from "~/scripts/parse-raw-game-data/utils";

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
