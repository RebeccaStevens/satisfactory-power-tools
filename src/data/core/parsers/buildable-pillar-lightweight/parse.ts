import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseBoolean, parsePoint3D } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mSize"));
  assert(Object.hasOwn(data, "mIsSupport"));

  return {
    ...buildable,
    mSize: parsePoint3D(data.mSize),
    mIsSupport: parseBoolean(data.mIsSupport),
  };
}
