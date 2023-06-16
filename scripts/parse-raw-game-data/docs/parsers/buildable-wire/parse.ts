import assert from "node:assert/strict";

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

  assert("mMaxLength" in data);
  assert("mLengthPerCost" in data);
  assert("mConnections" in data);

  return {
    ...buildable,
    mMaxLength: parseNumber(data.mMaxLength),
    mLengthPerCost: parseNumber(data.mLengthPerCost),
    mConnections: parseWireConnections(data.mConnections),
  };
}
