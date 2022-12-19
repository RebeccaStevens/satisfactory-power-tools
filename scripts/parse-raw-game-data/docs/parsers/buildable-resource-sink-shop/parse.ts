import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mShopInventoryDefaultSize" in data);

  return {
    ...buildableBuilding,
    mShopInventoryDefaultSize: parseNumber(data.mShopInventoryDefaultSize),
  };
}
