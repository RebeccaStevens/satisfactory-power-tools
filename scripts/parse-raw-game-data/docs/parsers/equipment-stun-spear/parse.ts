import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const consumableEquipment = parseConsumableEquipment(data);

  assert("mSecondSwingMaxTime" in data);
  assert("mSecondSwingCooldDownTime" in data);
  assert("mAttackDistance" in data);
  assert("mAttackSweepRadius" in data);

  return {
    ...consumableEquipment,
    mSecondSwingMaxTime: parseNumber(data.mSecondSwingMaxTime),
    mSecondSwingCooldDownTime: parseNumber(data.mSecondSwingCooldDownTime),
    mAttackDistance: parseNumber(data.mAttackDistance),
    mAttackSweepRadius: parseNumber(data.mAttackSweepRadius),
  };
}
