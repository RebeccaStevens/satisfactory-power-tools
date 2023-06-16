import assert from "node:assert/strict";

import { parseBuildableWall } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableWall = parseBuildableWall(data);

  assert("mCanBeLocked" in data);
  assert("mAnimationRate" in data);
  assert("mMovementRate" in data);

  return {
    ...buildableWall,
    mCanBeLocked: parseBoolean(data.mCanBeLocked),
    mAnimationRate: parseNumber(data.mAnimationRate),
    mMovementRate: parseNumber(data.mMovementRate),
  };
}
