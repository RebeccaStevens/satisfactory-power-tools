import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const equipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mSprintSpeedFactor"));
  assert(Object.hasOwn(data, "mJumpSpeedFactor"));

  return {
    ...equipment,
    mSprintSpeedFactor: parseNumber(data.mSprintSpeedFactor),
    mJumpSpeedFactor: parseNumber(data.mJumpSpeedFactor),
  };
}
