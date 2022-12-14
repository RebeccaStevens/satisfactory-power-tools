import assert from "node:assert/strict";

import { parseBaseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseMinMaxNumber,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isNotNull, isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const baseItem = parseBaseItem(data);

  const conditionalProps = [
    "mFuelConsumption" in data
      ? ["mFuelConsumption", parseNumber(data.mFuelConsumption)]
      : null,
    "mPowerConsumption" in data
      ? ["mPowerConsumption", parseMinMaxNumber(data.mPowerConsumption)]
      : null,
    "mInventorySize" in data
      ? ["mInventorySize", parseNumber(data.mInventorySize)]
      : null,
  ].filter(isNotNull);

  assert(conditionalProps.length > 0);

  return {
    ...baseItem,
    ...Object.fromEntries(conditionalProps),
  } as Data;
}
