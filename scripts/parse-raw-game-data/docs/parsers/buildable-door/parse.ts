import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableWall } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableWall = parseBuildableWall(data);

  assertPropertyExists(data, "mCanBeLocked");
  assertPropertyExists(data, "mAnimationRate");
  assertPropertyExists(data, "mMovementRate");

  return {
    ...buildableWall,
    mCanBeLocked: parseBoolean(data.mCanBeLocked),
    mAnimationRate: parseNumber(data.mAnimationRate),
    mMovementRate: parseNumber(data.mMovementRate),
  };
}
