import assert from "node:assert/strict";

import { parseBaseItem } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const baseItem = parseBaseItem(data);

  assert(Object.hasOwn(data, "mResourceSinkPoints"));

  return {
    ...baseItem,
    mResourceSinkPoints: parseNumber(data.mResourceSinkPoints),
  };
}
