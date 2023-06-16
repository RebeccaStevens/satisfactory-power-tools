import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assert("mIsWorking" in data);
  assert("mHasNegatedDamage" in data);
  assert("mDamageNegated" in data);
  assert("mFilterDuration" in data);
  assert("mCountdown" in data);
  assert("mDisableEffectTimer" in data);

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
