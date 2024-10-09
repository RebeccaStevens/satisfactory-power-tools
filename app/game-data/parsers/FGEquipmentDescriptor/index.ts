import type { Effect } from "effect";

import {
  type FGItemDescriptor,
  parseFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGEquipmentDescriptor } from "./assert";

export function parseFGEquipmentDescriptor(
  data: unknown,
): Effect.Effect<FGEquipmentDescriptor, ParseError> {
  assertVendorFGEquipmentDescriptor(data);
  return parseFGItemDescriptor(data);
}

export type FGEquipmentDescriptor = FGItemDescriptor;
