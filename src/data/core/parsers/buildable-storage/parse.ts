import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/data/core/parsers";
import { parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mStackingHeight"));
  assert(Object.hasOwn(data, "mInventorySizeX"));
  assert(Object.hasOwn(data, "mInventorySizeY"));

  return {
    ...buildableBuilding,
    mStackingHeight: parseNumber(data.mStackingHeight),
    mInventorySizeX: parseNumber(data.mInventorySizeX),
    mInventorySizeY: parseNumber(data.mInventorySizeY),
  };
}
