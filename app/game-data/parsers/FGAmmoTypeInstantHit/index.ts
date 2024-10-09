import type { Effect } from "effect";

import {
  type AbstractFGAmmoType,
  parseAbstractFGAmmoType,
} from "~/game-data/parsers/abstractFGAmmoType";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGAmmoTypeInstantHit } from "./assert";

export function parseFGAmmoTypeInstantHit(
  data: unknown,
): Effect.Effect<FGAmmoTypeInstantHit, ParseError> {
  assertVendorFGAmmoTypeInstantHit(data);
  return parseAbstractFGAmmoType(data);
}

export type FGAmmoTypeInstantHit = AbstractFGAmmoType & {};
