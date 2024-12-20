import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGJumpingStilts } from "./assert";

export function parseFGJumpingStilts(data: unknown): Effect.Effect<FGJumpingStilts, ParseError> {
  assertVendorFGJumpingStilts(data);

  return pipe(
    Effect.all([parseFGEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGJumpingStilts = FGEquipment & {};
