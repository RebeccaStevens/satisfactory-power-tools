import assert from "node:assert/strict";

import { parseBaseAmmoType } from "~/scripts/parse-raw-game-data/parsers";
import { parseBoolean } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const ammo = parseBaseAmmoType(data);

  assert(Object.hasOwn(data, "mPlayFireEffects"));

  return {
    ...ammo,
    mPlayFireEffects: parseBoolean(data.mPlayFireEffects),
  };
}
