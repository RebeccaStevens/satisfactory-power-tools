import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mUseDistanceOverride");
  assertPropertyExists(data, "mIsDeployed");

  return {
    ...equipment,
    mUseDistanceOverride: parseNumber(data.mUseDistanceOverride),
    mIsDeployed: parseBoolean(data.mIsDeployed),
  };
}
