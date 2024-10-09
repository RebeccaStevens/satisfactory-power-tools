import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableStorage } from "./assert";

export function parseFGBuildableStorage(
  data: unknown,
): Effect.Effect<FGBuildableStorage, ParseError> {
  assertVendorFGBuildableStorage(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableStorage = FGBuildable & {};
