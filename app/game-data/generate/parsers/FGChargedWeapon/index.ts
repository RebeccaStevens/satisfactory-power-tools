import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGChargedWeapon } from "./assert";

export function parseFGChargedWeapon(data: unknown): Effect.Effect<FGChargedWeapon, ParseError> {
  assertVendorFGChargedWeapon(data);

  return pipe(
    Effect.all([parseFGEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGChargedWeapon = FGEquipment & {};
