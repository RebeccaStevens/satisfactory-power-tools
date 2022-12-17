import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseResourceForms,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const equipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mAllowedResourceForms"));
  assert(Object.hasOwn(data, "mPlaceDistanceMax"));

  return {
    ...equipment,
    mAllowedResourceForms: parseResourceForms(data.mAllowedResourceForms),
    mPlaceDistanceMax: parseNumber(data.mPlaceDistanceMax),
  };
}
