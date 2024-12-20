import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableBeamLightweight } from "./assert";

export function parseFGBuildableBeamLightweight(data: unknown): Effect.Effect<FGBuildableBeamLightweight, ParseError> {
  assertVendorFGBuildableBeamLightweight(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          size: parseVendorFloat(data.mSize),
          defaultLength: parseVendorFloat(data.mDefaultLength),
          maxLength: parseVendorFloat(data.mMaxLength),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableBeamLightweight = FGBuildable & {
  size: number;
  defaultLength: number;
  maxLength: number;
};
