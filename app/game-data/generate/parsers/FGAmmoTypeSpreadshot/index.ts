import type { Effect } from "effect";

import { type AbstractFGAmmoType, parseAbstractFGAmmoType } from "~/game-data/generate/parsers/abstract/FGAmmoType";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGAmmoTypeSpreadshot } from "./assert";

export function parseFGAmmoTypeSpreadshot(data: unknown): Effect.Effect<FGAmmoTypeSpreadshot, ParseError> {
  assertVendorFGAmmoTypeSpreadshot(data);
  return parseAbstractFGAmmoType(data);
}

export type FGAmmoTypeSpreadshot = AbstractFGAmmoType & {};
