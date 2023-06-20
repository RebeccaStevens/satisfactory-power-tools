import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseWireConnections,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mMaxLength");
  assertPropertyExists(data, "mLengthPerCost");
  assertPropertyExists(data, "mConnections");

  return {
    ...buildable,
    mMaxLength: parseNumber(data.mMaxLength),
    mLengthPerCost: parseNumber(data.mLengthPerCost),
    mConnections: parseWireConnections(data.mConnections),
  };
}
