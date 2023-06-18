import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mSprintSpeedFactor");
  assertPropertyExists(data, "mJumpSpeedFactor");

  return {
    ...equipment,
    mSprintSpeedFactor: parseNumber(data.mSprintSpeedFactor),
    mJumpSpeedFactor: parseNumber(data.mJumpSpeedFactor),
  };
}
