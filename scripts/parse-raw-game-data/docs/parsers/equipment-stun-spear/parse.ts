import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const consumableEquipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mSecondSwingMaxTime");
  assertPropertyExists(data, "mSecondSwingCooldDownTime");
  assertPropertyExists(data, "mAttackDistance");
  assertPropertyExists(data, "mAttackSweepRadius");

  return {
    ...consumableEquipment,
    mSecondSwingMaxTime: parseNumber(data.mSecondSwingMaxTime),
    mSecondSwingCooldDownTime: parseNumber(data.mSecondSwingCooldDownTime),
    mAttackDistance: parseNumber(data.mAttackDistance),
    mAttackSweepRadius: parseNumber(data.mAttackSweepRadius),
  };
}
