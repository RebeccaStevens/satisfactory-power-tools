import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import {
  parseClasses,
  parseNumber,
  parseBoolean,
  parseTransform3D,
} from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mMeshHeight"));
  assert(Object.hasOwn(data, "mTopTransform"));
  assert(Object.hasOwn(data, "mIsReversed"));
  assert(Object.hasOwn(data, "mSpeed"));
  assert(Object.hasOwn(data, "mItems"));

  return {
    ...buildable,
    mMeshHeight: parseNumber(data.mMeshHeight),
    mTopTransform: parseTransform3D(data.mTopTransform),
    mIsReversed: parseBoolean(data.mIsReversed),
    mSpeed: parseNumber(data.mSpeed),
    mItems: parseClasses(data.mItems),
  };
}
