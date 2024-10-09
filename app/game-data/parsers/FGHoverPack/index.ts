import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGHoverPack } from "./assert";

export function parseFGHoverPack(
  data: unknown,
): Effect.Effect<FGHoverPack, ParseError> {
  assertVendorFGHoverPack(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGHoverPack = AbstractEquipment & {};
