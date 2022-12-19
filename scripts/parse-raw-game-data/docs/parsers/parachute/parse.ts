import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assert("mTerminalVelocityZ" in data);
  assert("mIsDeployed" in data);

  return {
    ...equipment,
    mTerminalVelocityZ: parseNumber(data.mTerminalVelocityZ),
    mIsDeployed: parseBoolean(data.mIsDeployed),
  };
}
