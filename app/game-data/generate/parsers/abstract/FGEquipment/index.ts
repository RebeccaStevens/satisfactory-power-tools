import type { Effect } from "effect";

import { type FGBase, parseFGBase } from "~/game-data/generate/parsers/abstract/FGBase";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGEquipment } from "./assert";

export function parseFGEquipment(data: unknown): Effect.Effect<FGEquipment, ParseError> {
  assertVendorFGEquipment(data);

  return parseFGBase(data);
}

export type FGEquipment = FGBase & {};
