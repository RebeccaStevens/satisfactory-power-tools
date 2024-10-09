import type { Effect } from "effect";

import {
  type AbstractBase,
  parseAbstractBase,
} from "~/game-data/parsers/abstractBase";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorAbstractEquipment } from "./assert";

export function parseAbstractEquipment(
  data: unknown,
): Effect.Effect<AbstractEquipment, ParseError> {
  assertVendorAbstractEquipment(data);

  return parseAbstractBase(data);
}

export type AbstractEquipment = AbstractBase & {};
