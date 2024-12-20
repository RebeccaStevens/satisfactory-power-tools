import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGGolfCartDispenser } from "./assert";

export function parseFGGolfCartDispenser(data: unknown): Effect.Effect<FGGolfCartDispenser, ParseError> {
  assertVendorFGGolfCartDispenser(data);

  return pipe(
    Effect.all([parseFGEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGGolfCartDispenser = FGEquipment & {};
