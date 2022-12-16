import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/data/core/parsers";
import { parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const consumableEquipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mSecondSwingMaxTime"));
  assert(Object.hasOwn(data, "mSecondSwingCooldDownTime"));
  assert(Object.hasOwn(data, "mAttackDistance"));
  assert(Object.hasOwn(data, "mAttackSweepRadius"));

  return {
    ...consumableEquipment,
    mSecondSwingMaxTime: parseNumber(data.mSecondSwingMaxTime),
    mSecondSwingCooldDownTime: parseNumber(data.mSecondSwingCooldDownTime),
    mAttackDistance: parseNumber(data.mAttackDistance),
    mAttackSweepRadius: parseNumber(data.mAttackSweepRadius),
  };
}
