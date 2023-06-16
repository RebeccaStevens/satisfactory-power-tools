import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mStackingHeight" in data);
  assert("mInventorySizeX" in data);
  assert("mInventorySizeY" in data);

  return {
    ...buildableBuilding,
    mStackingHeight: parseNumber(data.mStackingHeight),
    mInventorySizeX: parseNumber(data.mInventorySizeX),
    mInventorySizeY: parseNumber(data.mInventorySizeY),
  };
}
