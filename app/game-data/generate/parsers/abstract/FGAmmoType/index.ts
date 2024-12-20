import type { Effect } from "effect";

import { type FGItemDescriptor, parseFGItemDescriptor } from "~/game-data/generate/parsers/FGItemDescriptor";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorAbstractFGAmmoType } from "./assert";

export function parseAbstractFGAmmoType(data: unknown): Effect.Effect<AbstractFGAmmoType, ParseError> {
  assertVendorAbstractFGAmmoType(data);
  return parseFGItemDescriptor(data);
}

export type AbstractFGAmmoType = FGItemDescriptor & {};
