import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseString,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";

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
