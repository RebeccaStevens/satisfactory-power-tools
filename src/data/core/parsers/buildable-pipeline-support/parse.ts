import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseBoolean, parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mLength"));
  assert(Object.hasOwn(data, "mVerticalAngle"));
  assert(Object.hasOwn(data, "mUseStaticHeight"));
  assert(Object.hasOwn(data, "mCanStack"));
  assert(Object.hasOwn(data, "mStackHeight"));

  return {
    ...buildable,
    mLength: parseNumber(data.mLength),
    mVerticalAngle: parseNumber(data.mVerticalAngle),
    mUseStaticHeight: parseBoolean(data.mUseStaticHeight),
    mCanStack: parseBoolean(data.mCanStack),
    mStackHeight: parseNumber(data.mStackHeight),
  };
}
