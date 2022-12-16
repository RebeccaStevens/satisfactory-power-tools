import assert from "node:assert/strict";

import { parseBaseItem } from "~/data/core/parsers";
import { parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const baseItem = parseBaseItem(data);

  assert(Object.hasOwn(data, "mResourceSinkPoints"));

  return {
    ...baseItem,
    mResourceSinkPoints: parseNumber(data.mResourceSinkPoints),
  };
}
