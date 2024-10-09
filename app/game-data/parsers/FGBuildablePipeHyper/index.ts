import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildablePipeHyper } from "./assert";

export function parseFGBuildablePipeHyper(
  data: unknown,
): Effect.Effect<FGBuildablePipeHyper, ParseError> {
  assertVendorFGBuildablePipeHyper(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePipeHyper = FGBuildable & {};
