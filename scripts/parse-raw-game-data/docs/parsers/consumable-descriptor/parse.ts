import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parsePoint3D,
  parseNumber,
  parseRotation3D,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const item = parseItem(data);

  assertPropertyExists(data, "mCustomHandsMeshScale");
  assertPropertyExists(data, "mCustomRotation");
  assertPropertyExists(data, "mCustomLocation");

  const conditionalProps = Object.fromEntries([
    "mHealthGain" in data
      ? [
          "mHealthGain",
          (assertPropertyExists(data, "mHealthGain"),
          parseNumber(data.mHealthGain)),
        ]
      : [],
  ]);

  return {
    ...item,
    ...conditionalProps,
    mCustomHandsMeshScale: parseNumber(data.mCustomHandsMeshScale),
    mCustomRotation: parseRotation3D(data.mCustomRotation),
    mCustomLocation: parsePoint3D(data.mCustomLocation),
  };
}
