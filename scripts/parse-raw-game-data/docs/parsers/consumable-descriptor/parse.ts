import assert from "node:assert/strict";

import { parseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parsePoint3D,
  parseNumber,
  parseRotation3D,
} from "~/scripts/parse-raw-game-data/utils";
import { assertNever, isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const item = parseItem(data);

  assert("mHealthGain" in data || "mCustomHandsMeshScale" in data);
  assert("mCustomHandsMeshScale" in data);
  assert("mCustomRotation" in data);
  assert("mCustomLocation" in data);

  const conditionalProps = Object.fromEntries([
    "mHealthGain" in data
      ? ["mHealthGain", parseNumber(data.mHealthGain)]
      : "mCustomHandsMeshScale" in data
      ? ["mCustomHandsMeshScale", parseNumber(data.mCustomHandsMeshScale)]
      : assertNever(),
  ]);

  return {
    ...item,
    ...conditionalProps,
    mCustomHandsMeshScale: parseNumber(data.mCustomHandsMeshScale),
    mCustomRotation: parseRotation3D(data.mCustomRotation),
    mCustomLocation: parsePoint3D(data.mCustomLocation),
  };
}
