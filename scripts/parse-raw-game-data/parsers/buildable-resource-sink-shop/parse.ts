import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mShopInventoryDefaultSize"));

  return {
    ...buildableBuilding,
    mShopInventoryDefaultSize: parseNumber(data.mShopInventoryDefaultSize),
  };
}
