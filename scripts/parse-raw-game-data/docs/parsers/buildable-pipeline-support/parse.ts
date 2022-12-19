import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mLength" in data);
  assert("mVerticalAngle" in data);
  assert("mUseStaticHeight" in data);
  assert("mCanStack" in data);
  assert("mStackHeight" in data);

  return {
    ...buildable,
    mLength: parseNumber(data.mLength),
    mVerticalAngle: parseNumber(data.mVerticalAngle),
    mUseStaticHeight: parseBoolean(data.mUseStaticHeight),
    mCanStack: parseBoolean(data.mCanStack),
    mStackHeight: parseNumber(data.mStackHeight),
  };
}
