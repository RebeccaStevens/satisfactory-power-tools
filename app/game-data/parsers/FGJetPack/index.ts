import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGJetPack } from "./assert";

export function parseFGJetPack(
  data: unknown,
): Effect.Effect<FGJetPack, ParseError> {
  assertVendorFGJetPack(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGJetPack = AbstractEquipment & {};
