import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mStackingHeight");
  assertPropertyExists(data, "mInventorySizeX");
  assertPropertyExists(data, "mInventorySizeY");

  return {
    ...buildableBuilding,
    mStackingHeight: parseNumber(data.mStackingHeight),
    mInventorySizeX: parseNumber(data.mInventorySizeX),
    mInventorySizeY: parseNumber(data.mInventorySizeY),
  };
}
