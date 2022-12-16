import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/data/core/parsers";
import { parseBoolean, parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const equipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mTerminalVelocityZ"));
  assert(Object.hasOwn(data, "mIsDeployed"));

  return {
    ...equipment,
    mTerminalVelocityZ: parseNumber(data.mTerminalVelocityZ),
    mIsDeployed: parseBoolean(data.mIsDeployed),
  };
}
