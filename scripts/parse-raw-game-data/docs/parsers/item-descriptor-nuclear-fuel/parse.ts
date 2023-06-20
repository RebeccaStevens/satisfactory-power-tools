import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseString } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const item = parseItem(data);

  assertPropertyExists(data, "mSpentFuelClass");
  assertPropertyExists(data, "mAmountOfWaste");

  return {
    ...item,
    mSpentFuelClass: parseString(data.mSpentFuelClass),
    mAmountOfWaste: parseNumber(data.mAmountOfWaste),
  };
}
