import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/data/core/parsers";
import { parseNumber } from "~/data/core/utils";

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
