import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseResourceForms,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assert("mAllowedResourceForms" in data);
  assert("mPlaceDistanceMax" in data);

  return {
    ...equipment,
    mAllowedResourceForms: parseResourceForms(data.mAllowedResourceForms),
    mPlaceDistanceMax: parseNumber(data.mPlaceDistanceMax),
  };
}
