import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseNumber, parseString, parseClasses } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mMapText"));
  assert(Object.hasOwn(data, "mRevealRadius"));
  assert(Object.hasOwn(data, "mScannableDescriptors"));

  return {
    ...buildable,
    mMapText: parseString(data.mMapText),
    mRevealRadius: parseNumber(data.mRevealRadius),
    mScannableDescriptors: parseClasses(data.mScannableDescriptors),
  };
}
