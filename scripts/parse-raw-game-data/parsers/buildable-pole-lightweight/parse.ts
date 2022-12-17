import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseBoolean,
  parseNumber,
  parseFalsableNumber,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mHeight"));
  assert(Object.hasOwn(data, "mSelectedPoleVersion"));
  assert(Object.hasOwn(data, "mUseStaticHeight"));
  assert(Object.hasOwn(data, "mCanStack"));
  assert(Object.hasOwn(data, "mStackHeight"));

  return {
    ...buildable,
    mHeight: parseNumber(data.mHeight),
    mSelectedPoleVersion: parseFalsableNumber(data.mSelectedPoleVersion),
    mUseStaticHeight: parseBoolean(data.mUseStaticHeight),
    mCanStack: parseBoolean(data.mCanStack),
    mStackHeight: parseNumber(data.mStackHeight),
  };
}
