import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseString,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mMapText");
  assertPropertyExists(data, "mRevealRadius");
  assertPropertyExists(data, "mScannableDescriptors");

  return {
    ...buildable,
    mMapText: parseString(data.mMapText),
    mRevealRadius: parseNumber(data.mRevealRadius),
    mScannableDescriptors: parseClasses(data.mScannableDescriptors),
  };
}
