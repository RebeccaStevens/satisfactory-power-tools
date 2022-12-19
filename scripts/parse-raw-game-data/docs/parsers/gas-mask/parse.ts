import assert from "node:assert/strict";

import { parseBaseGasMask } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBaseGasMask(data);

  assert("mPostProcessEnabled" in data);
  assert("mIsInPoisonArea" in data);

  return {
    ...base,
    mPostProcessEnabled: parseBoolean(data.mPostProcessEnabled),
    mIsInPoisonArea: parseBoolean(data.mIsInPoisonArea),
  };
}
