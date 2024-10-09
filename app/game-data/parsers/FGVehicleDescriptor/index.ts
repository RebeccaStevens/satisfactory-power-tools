import { Effect, pipe } from "effect";

import {
  type AbstractBase,
  parseAbstractBase,
} from "~/game-data/parsers/abstractBase";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGVehicleDescriptor } from "./assert";

export function parseFGVehicleDescriptor(
  data: unknown,
): Effect.Effect<FGVehicleDescriptor, ParseError> {
  assertVendorFGVehicleDescriptor(data);

  return pipe(
    Effect.all([parseAbstractBase(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGVehicleDescriptor = AbstractBase & {};
