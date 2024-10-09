import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableSpaceElevator } from "./assert";

export function parseFGBuildableSpaceElevator(
  data: unknown,
): Effect.Effect<FGBuildableSpaceElevator, ParseError> {
  assertVendorFGBuildableSpaceElevator(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableSpaceElevator = FGBuildable & {};
