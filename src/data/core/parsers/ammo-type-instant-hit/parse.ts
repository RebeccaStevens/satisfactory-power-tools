import assert from "node:assert/strict";

import { parseBaseAmmoType } from "~/data/core/parsers";
import { parseBoolean } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const ammo = parseBaseAmmoType(data);

  assert(Object.hasOwn(data, "mPlayFireEffects"));

  return {
    ...ammo,
    mPlayFireEffects: parseBoolean(data.mPlayFireEffects),
  };
}
