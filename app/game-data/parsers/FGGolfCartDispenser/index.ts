import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGGolfCartDispenser } from "./assert";

export function parseFGGolfCartDispenser(
  data: unknown,
): Effect.Effect<FGGolfCartDispenser, ParseError> {
  assertVendorFGGolfCartDispenser(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGGolfCartDispenser = AbstractEquipment & {};
