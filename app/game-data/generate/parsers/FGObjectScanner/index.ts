import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGObjectScanner } from "./assert";

export function parseFGObjectScanner(data: unknown): Effect.Effect<FGObjectScanner, ParseError> {
  assertVendorFGObjectScanner(data);

  return pipe(
    Effect.all([parseFGEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGObjectScanner = FGEquipment & {};
