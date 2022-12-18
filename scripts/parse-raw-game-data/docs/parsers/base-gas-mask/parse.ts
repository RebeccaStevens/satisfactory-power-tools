import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";

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
