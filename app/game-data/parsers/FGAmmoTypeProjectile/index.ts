import type { Effect } from "effect";

import {
  type AbstractFGAmmoType,
  parseAbstractFGAmmoType,
} from "~/game-data/parsers/abstractFGAmmoType";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGAmmoTypeProjectile } from "./assert";

export function parseFGAmmoTypeProjectile(
  data: unknown,
): Effect.Effect<FGAmmoTypeProjectile, ParseError> {
  assertVendorFGAmmoTypeProjectile(data);
  return parseAbstractFGAmmoType(data);
}

export type FGAmmoTypeProjectile = AbstractFGAmmoType & {};
