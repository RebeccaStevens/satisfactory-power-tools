import assert from "node:assert/strict";

import { parseBaseItem } from "~/data/core/parsers";
import { parseMinMaxNumber, parseNumber } from "~/data/core/utils";
import { isNotNull } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const baseItem = parseBaseItem(data);
  const conditionalProps = [
    Object.hasOwn(data, "mFuelConsumption")
      ? ["mFuelConsumption", parseNumber(data.mFuelConsumption)]
      : null,
    Object.hasOwn(data, "mPowerConsumption")
      ? ["mPowerConsumption", parseMinMaxNumber(data.mPowerConsumption)]
      : null,
    Object.hasOwn(data, "mInventorySize")
      ? ["mInventorySize", parseNumber(data.mInventorySize)]
      : null,
  ].filter(isNotNull);

  assert(conditionalProps.length > 0);

  return {
    ...baseItem,
    ...Object.fromEntries(conditionalProps),
  } as Data;
}
