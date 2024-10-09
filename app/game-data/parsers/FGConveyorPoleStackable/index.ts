import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGConveyorPoleStackable } from "./assert";

export function parseFGConveyorPoleStackable(
  data: unknown,
): Effect.Effect<FGConveyorPoleStackable, ParseError> {
  assertVendorFGConveyorPoleStackable(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGConveyorPoleStackable = FGBuildable & {};
