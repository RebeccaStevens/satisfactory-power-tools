import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableConveyorBelt } from "./assert";

export function parseFGBuildableConveyorBelt(data: unknown): Effect.Effect<FGBuildableConveyorBelt, ParseError> {
  assertVendorFGBuildableConveyorBelt(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          speed: parseVendorFloat(data.mSpeed),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableConveyorBelt = FGBuildable & {
  speed: number;
};
