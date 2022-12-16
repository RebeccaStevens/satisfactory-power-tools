import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mSize"));
  assert(Object.hasOwn(data, "mElevation"));

  return {
    ...buildable,
    mSize: parseNumber(data.mSize),
    mElevation: parseNumber(data.mElevation),
  };
}
