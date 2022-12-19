import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseNumber,
  parseFalsableNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mHeight" in data);
  assert("mSelectedPoleVersion" in data);
  assert("mUseStaticHeight" in data);
  assert("mCanStack" in data);
  assert("mStackHeight" in data);

  return {
    ...buildable,
    mHeight: parseNumber(data.mHeight),
    mSelectedPoleVersion: parseFalsableNumber(data.mSelectedPoleVersion),
    mUseStaticHeight: parseBoolean(data.mUseStaticHeight),
    mCanStack: parseBoolean(data.mCanStack),
    mStackHeight: parseNumber(data.mStackHeight),
  };
}
