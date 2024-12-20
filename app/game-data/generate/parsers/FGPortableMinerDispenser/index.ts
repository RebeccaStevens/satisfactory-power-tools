import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGPortableMinerDispenser } from "./assert";

export function parseFGPortableMinerDispenser(data: unknown): Effect.Effect<FGPortableMinerDispenser, ParseError> {
  assertVendorFGPortableMinerDispenser(data);

  return pipe(
    Effect.all([parseFGEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGPortableMinerDispenser = FGEquipment & {};
