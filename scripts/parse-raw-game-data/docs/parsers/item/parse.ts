import assert from "node:assert/strict";

import { parseBaseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const baseItem = parseBaseItem(data);

  assert("mResourceSinkPoints" in data);

  return {
    ...baseItem,
    mResourceSinkPoints: parseNumber(data.mResourceSinkPoints),
  };
}
