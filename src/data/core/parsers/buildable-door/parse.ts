import assert from "node:assert/strict";

import { parseBuildableWall } from "~/data/core/parsers";
import { parseBoolean, parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableWall = parseBuildableWall(data);

  assert(Object.hasOwn(data, "mCanBeLocked"));
  assert(Object.hasOwn(data, "mAnimationRate"));
  assert(Object.hasOwn(data, "mMovementRate"));

  return {
    ...buildableWall,
    mCanBeLocked: parseBoolean(data.mCanBeLocked),
    mAnimationRate: parseNumber(data.mAnimationRate),
    mMovementRate: parseNumber(data.mMovementRate),
  };
}
