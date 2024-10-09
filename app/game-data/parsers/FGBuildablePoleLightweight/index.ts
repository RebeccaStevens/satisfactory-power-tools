import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildablePoleLightweight } from "./assert";

export function parseFGBuildablePoleLightweight(
  data: unknown,
): Effect.Effect<FGBuildablePoleLightweight, ParseError> {
  assertVendorFGBuildablePoleLightweight(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePoleLightweight = FGBuildable & {};
