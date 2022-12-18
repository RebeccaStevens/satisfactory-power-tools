import assert from "node:assert/strict";

import { parseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parsePoint3D,
  parseNumber,
  parseRotation3D,
} from "~/scripts/parse-raw-game-data/utils";
import { assertNever } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const item = parseItem(data);

  assert(
    Object.hasOwn(data, "mHealthGain") ||
      Object.hasOwn(data, "mCustomHandsMeshScale"),
  );
  assert(Object.hasOwn(data, "mCustomHandsMeshScale"));
  assert(Object.hasOwn(data, "mCustomRotation"));
  assert(Object.hasOwn(data, "mCustomLocation"));

  const conditionalProps = Object.fromEntries([
    Object.hasOwn(data, "mHealthGain")
      ? ["mHealthGain", parseNumber(data.mHealthGain)]
      : Object.hasOwn(data, "mCustomHandsMeshScale")
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
