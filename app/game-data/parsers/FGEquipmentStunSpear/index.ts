import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGEquipmentStunSpear } from "./assert";

export function parseFGEquipmentStunSpear(
  data: unknown,
): Effect.Effect<FGEquipmentStunSpear, ParseError> {
  assertVendorFGEquipmentStunSpear(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGEquipmentStunSpear = AbstractEquipment & {};
