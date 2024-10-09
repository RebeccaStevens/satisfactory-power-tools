import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorInt } from "~/game-data/parsers/primitives";

import { assertVendorFGBuildableCircuitSwitch } from "./assert";

export function parseFGBuildableCircuitSwitch(
  data: unknown,
): Effect.Effect<FGBuildableCircuitSwitch, ParseError> {
  assertVendorFGBuildableCircuitSwitch(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          maxCharacters: parseVendorInt(data.mMaxCharacters),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableCircuitSwitch = FGBuildable & {
  maxCharacters: number;
};
