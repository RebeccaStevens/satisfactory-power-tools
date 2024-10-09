import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGObjectScanner } from "./assert";

export function parseFGObjectScanner(
  data: unknown,
): Effect.Effect<FGObjectScanner, ParseError> {
  assertVendorFGObjectScanner(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGObjectScanner = AbstractEquipment & {};
