import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseResourceForms,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mAllowedResourceForms");
  assertPropertyExists(data, "mPlaceDistanceMax");

  return {
    ...equipment,
    mAllowedResourceForms: parseResourceForms(data.mAllowedResourceForms),
    mPlaceDistanceMax: parseNumber(data.mPlaceDistanceMax),
  };
}
