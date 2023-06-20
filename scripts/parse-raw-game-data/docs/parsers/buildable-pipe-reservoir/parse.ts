import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mStackingHeight");
  assertPropertyExists(data, "mStorageCapacity");
  assertPropertyExists(data, "mPipeConnections");

  return {
    ...buildableBuilding,
    mStackingHeight: parseNumber(data.mStackingHeight),
    mStorageCapacity: parseNumber(data.mStorageCapacity),
    mPipeConnections: parsePipeConnections(data.mPipeConnections),
  };
}
