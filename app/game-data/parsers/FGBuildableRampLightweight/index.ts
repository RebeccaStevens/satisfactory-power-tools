import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGBuildableRampLightweight } from "./assert";

export function parseFGBuildableRampLightweight(
  data: unknown,
): Effect.Effect<FGBuildableRampLightweight, ParseError> {
  assertVendorFGBuildableRampLightweight(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableRampLightweight = FGBuildable & {};
