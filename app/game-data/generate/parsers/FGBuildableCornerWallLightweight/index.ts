import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableCornerWallLightweight } from "./assert";

export function parseFGBuildableCornerWallLightweight(
  data: unknown,
): Effect.Effect<FGBuildableCornerWallLightweight, ParseError> {
  assertVendorFGBuildableCornerWallLightweight(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          width: parseVendorFloat(data.mSize),
          height: parseVendorFloat(data.mHeight),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableCornerWallLightweight = FGBuildable & {
  width: number;
  height: number;
};
