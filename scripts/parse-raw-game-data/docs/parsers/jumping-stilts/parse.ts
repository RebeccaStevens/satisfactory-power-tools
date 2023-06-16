import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assert("mSprintSpeedFactor" in data);
  assert("mJumpSpeedFactor" in data);

  return {
    ...equipment,
    mSprintSpeedFactor: parseNumber(data.mSprintSpeedFactor),
    mJumpSpeedFactor: parseNumber(data.mJumpSpeedFactor),
  };
}
