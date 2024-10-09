import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildablePowerStorage } from "./assert";

export function parseFGBuildablePowerStorage(
  data: unknown,
): Effect.Effect<FGBuildablePowerStorage, ParseError> {
  assertVendorFGBuildablePowerStorage(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePowerStorage = FGBuildable & {};
