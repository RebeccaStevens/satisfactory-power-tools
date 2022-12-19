import assert from "node:assert/strict";

import { parseString } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils/object";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));
  assert("ClassName" in data);

  return {
    ClassName: parseString(data.ClassName),
    mDisplayName:
      "mDisplayName" in data ? parseString(data.mDisplayName) : "N/A",
  };
}
