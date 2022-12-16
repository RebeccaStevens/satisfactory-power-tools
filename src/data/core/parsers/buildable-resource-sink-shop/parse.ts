import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/data/core/parsers";
import { parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mShopInventoryDefaultSize"));

  return {
    ...buildableBuilding,
    mShopInventoryDefaultSize: parseNumber(data.mShopInventoryDefaultSize),
  };
}
