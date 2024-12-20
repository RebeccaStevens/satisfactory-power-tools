import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGEquipmentZipline } from "./assert";

export function parseFGEquipmentZipline(data: unknown): Effect.Effect<FGEquipmentZipline, ParseError> {
  assertVendorFGEquipmentZipline(data);

  return pipe(
    Effect.all([parseFGEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGEquipmentZipline = FGEquipment & {};
