import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGEquipmentZipline } from "./assert";

export function parseFGEquipmentZipline(
  data: unknown,
): Effect.Effect<FGEquipmentZipline, ParseError> {
  assertVendorFGEquipmentZipline(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGEquipmentZipline = AbstractEquipment & {};
