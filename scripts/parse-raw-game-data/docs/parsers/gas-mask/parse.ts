import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBaseGasMask } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBaseGasMask(data);

  assertPropertyExists(data, "mPostProcessEnabled");
  assertPropertyExists(data, "mIsInPoisonArea");

  return {
    ...base,
    mPostProcessEnabled: parseBoolean(data.mPostProcessEnabled),
    mIsInPoisonArea: parseBoolean(data.mIsInPoisonArea),
  };
}
