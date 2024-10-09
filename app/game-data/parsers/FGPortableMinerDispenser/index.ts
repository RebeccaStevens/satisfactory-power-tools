import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGPortableMinerDispenser } from "./assert";

export function parseFGPortableMinerDispenser(
  data: unknown,
): Effect.Effect<FGPortableMinerDispenser, ParseError> {
  assertVendorFGPortableMinerDispenser(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGPortableMinerDispenser = AbstractEquipment & {};
