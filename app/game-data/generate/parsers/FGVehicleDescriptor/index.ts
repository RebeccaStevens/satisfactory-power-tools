import { Effect, pipe } from "effect";

import { type FGBase, parseFGBase } from "~/game-data/generate/parsers/abstract/FGBase";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGVehicleDescriptor } from "./assert";

export function parseFGVehicleDescriptor(data: unknown): Effect.Effect<FGVehicleDescriptor, ParseError> {
  assertVendorFGVehicleDescriptor(data);

  return pipe(
    Effect.all([parseFGBase(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGVehicleDescriptor = FGBase & {};
