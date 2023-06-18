import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseString,
  parseResearchState,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mOccupiedText");
  assertPropertyExists(data, "mCurrentResearchState");
  assertPropertyExists(data, "mSignificanceRange");

  return {
    ...buildable,
    mOccupiedText: parseString(data.mOccupiedText),
    mCurrentResearchState: parseResearchState(data.mCurrentResearchState),
    mSignificanceRange: parseNumber(data.mSignificanceRange),
  };
}
