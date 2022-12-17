import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseBoolean,
  parsePoint3D,
} from "~/scripts/parse-raw-game-data/utils";

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
