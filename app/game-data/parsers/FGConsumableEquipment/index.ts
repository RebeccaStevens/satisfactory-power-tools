import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGConsumableEquipment } from "./assert";

export function parseFGConsumableEquipment(
  data: unknown,
): Effect.Effect<FGConsumableEquipment, ParseError> {
  assertVendorFGConsumableEquipment(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGConsumableEquipment = AbstractEquipment & {};
