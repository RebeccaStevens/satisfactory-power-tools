import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseFalsableNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mCurrentInputIndex"));

  return {
    ...buildable,
    mCurrentInputIndex: parseFalsableNumber(data.mCurrentInputIndex),
  };
}
