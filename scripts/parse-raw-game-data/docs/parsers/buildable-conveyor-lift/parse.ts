import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseClasses,
  parseNumber,
  parseBoolean,
  parseTransform3D,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mMeshHeight" in data);
  assert("mTopTransform" in data);
  assert("mIsReversed" in data);
  assert("mSpeed" in data);
  assert("mItems" in data);

  return {
    ...buildable,
    mMeshHeight: parseNumber(data.mMeshHeight),
    mTopTransform: parseTransform3D(data.mTopTransform),
    mIsReversed: parseBoolean(data.mIsReversed),
    mSpeed: parseNumber(data.mSpeed),
    mItems: parseClasses(data.mItems),
  };
}
