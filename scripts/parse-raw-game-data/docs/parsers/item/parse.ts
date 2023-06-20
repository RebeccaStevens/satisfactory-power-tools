import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBaseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const baseItem = parseBaseItem(data);

  assertPropertyExists(data, "mResourceSinkPoints");

  return {
    ...baseItem,
    mResourceSinkPoints: parseNumber(data.mResourceSinkPoints),
  };
}
