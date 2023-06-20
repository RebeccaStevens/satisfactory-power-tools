import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parsePoint3D,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mSize");
  assertPropertyExists(data, "mIsSupport");

  return {
    ...buildable,
    mSize: parsePoint3D(data.mSize),
    mIsSupport: parseBoolean(data.mIsSupport),
  };
}
