import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGEquipmentStunSpear } from "./assert";

export function parseFGEquipmentStunSpear(data: unknown): Effect.Effect<FGEquipmentStunSpear, ParseError> {
  assertVendorFGEquipmentStunSpear(data);

  return pipe(
    Effect.all([parseFGEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGEquipmentStunSpear = FGEquipment & {};
