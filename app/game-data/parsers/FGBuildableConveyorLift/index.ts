import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorFloat } from "~/game-data/parsers/primitives";

import { assertVendorFGBuildableConveyorLift } from "./assert";

export function parseFGBuildableConveyorLift(
  data: unknown,
): Effect.Effect<FGBuildableConveyorLift, ParseError> {
  assertVendorFGBuildableConveyorLift(data);

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

export type FGBuildableConveyorLift = FGBuildable & {
  speed: number;
};
