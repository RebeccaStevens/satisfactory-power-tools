import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBaseAmmoType } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const ammo = parseBaseAmmoType(data);

  assertPropertyExists(data, "mPlayFireEffects");

  return {
    ...ammo,
    mPlayFireEffects: parseBoolean(data.mPlayFireEffects),
  };
}
