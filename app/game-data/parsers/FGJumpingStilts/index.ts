import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGJumpingStilts } from "./assert";

export function parseFGJumpingStilts(
  data: unknown,
): Effect.Effect<FGJumpingStilts, ParseError> {
  assertVendorFGJumpingStilts(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGJumpingStilts = AbstractEquipment & {};
