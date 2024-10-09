import type { Effect } from "effect";

import {
  type AbstractFGAmmoType,
  parseAbstractFGAmmoType,
} from "../abstractFGAmmoType";
import type { ParseError } from "../errors";

import { assertVendorFGAmmoTypeSpreadshot } from "./assert";

export function parseFGAmmoTypeSpreadshot(
  data: unknown,
): Effect.Effect<FGAmmoTypeSpreadshot, ParseError> {
  assertVendorFGAmmoTypeSpreadshot(data);
  return parseAbstractFGAmmoType(data);
}

export type FGAmmoTypeSpreadshot = AbstractFGAmmoType;
