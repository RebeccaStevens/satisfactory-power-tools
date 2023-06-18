import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mIsWorking");
  assertPropertyExists(data, "mHasNegatedDamage");
  assertPropertyExists(data, "mDamageNegated");
  assertPropertyExists(data, "mFilterDuration");
  assertPropertyExists(data, "mCountdown");
  assertPropertyExists(data, "mDisableEffectTimer");

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
