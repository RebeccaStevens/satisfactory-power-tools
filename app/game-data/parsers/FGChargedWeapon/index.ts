import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGChargedWeapon } from "./assert";

export function parseFGChargedWeapon(
  data: unknown,
): Effect.Effect<FGChargedWeapon, ParseError> {
  assertVendorFGChargedWeapon(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGChargedWeapon = AbstractEquipment & {};
