import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/data/core/parsers";
import { parseBoolean, parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const equipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mIsWorking"));
  assert(Object.hasOwn(data, "mHasNegatedDamage"));
  assert(Object.hasOwn(data, "mDamageNegated"));
  assert(Object.hasOwn(data, "mFilterDuration"));
  assert(Object.hasOwn(data, "mCountdown"));
  assert(Object.hasOwn(data, "mDisableEffectTimer"));

  return {
    ...equipment,
    mIsWorking: parseBoolean(data.mIsWorking),
    mHasNegatedDamage: parseBoolean(data.mHasNegatedDamage),
    mDamageNegated: parseNumber(data.mDamageNegated),
    mFilterDuration: parseNumber(data.mFilterDuration),
    mCountdown: parseNumber(data.mCountdown),
    mDisableEffectTimer: parseNumber(data.mDisableEffectTimer),
  };
}
