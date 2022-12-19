import assert from "node:assert/strict";

import { parseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseString } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const item = parseItem(data);

  assert("mSpentFuelClass" in data);
  assert("mAmountOfWaste" in data);

  return {
    ...item,
    mSpentFuelClass: parseString(data.mSpentFuelClass),
    mAmountOfWaste: parseNumber(data.mAmountOfWaste),
  };
}
