import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGConsumableEquipment } from "./assert";

export function parseFGConsumableEquipment(data: unknown): Effect.Effect<FGConsumableEquipment, ParseError> {
  assertVendorFGConsumableEquipment(data);

  return pipe(
    Effect.all([parseFGEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGConsumableEquipment = FGEquipment & {};
