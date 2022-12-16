import assert from "node:assert/strict";

import { parseBaseGasMask } from "~/data/core/parsers";
import { parseBoolean } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseBaseGasMask(data);

  assert(Object.hasOwn(data, "mPostProcessEnabled"));
  assert(Object.hasOwn(data, "mIsInPoisonArea"));

  return {
    ...base,
    mPostProcessEnabled: parseBoolean(data.mPostProcessEnabled),
    mIsInPoisonArea: parseBoolean(data.mIsInPoisonArea),
  };
}
