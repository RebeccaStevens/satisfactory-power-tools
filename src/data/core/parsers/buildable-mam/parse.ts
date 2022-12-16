import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import {
  parseNumber,
  parseString,
  parseResearchState,
} from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mOccupiedText"));
  assert(Object.hasOwn(data, "mCurrentResearchState"));
  assert(Object.hasOwn(data, "mSignificanceRange"));

  return {
    ...buildable,
    mOccupiedText: parseString(data.mOccupiedText),
    mCurrentResearchState: parseResearchState(data.mCurrentResearchState),
    mSignificanceRange: parseNumber(data.mSignificanceRange),
  };
}
