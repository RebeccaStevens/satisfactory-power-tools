import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseString } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils/object";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));
  assertPropertyExists(data, "ClassName");

  return {
    ClassName: parseString(data.ClassName),
    mDisplayName:
      "mDisplayName" in data
        ? (assertPropertyExists(data, "mDisplayName"),
          parseString(data.mDisplayName))
        : "N/A",
  };
}
