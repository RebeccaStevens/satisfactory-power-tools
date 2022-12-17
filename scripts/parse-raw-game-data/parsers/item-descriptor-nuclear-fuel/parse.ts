import assert from "node:assert/strict";

import { parseItem } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber, parseString } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const item = parseItem(data);

  assert(Object.hasOwn(data, "mSpentFuelClass"));
  assert(Object.hasOwn(data, "mAmountOfWaste"));

  return {
    ...item,
    mSpentFuelClass: parseString(data.mSpentFuelClass),
    mAmountOfWaste: parseNumber(data.mAmountOfWaste),
  };
}
