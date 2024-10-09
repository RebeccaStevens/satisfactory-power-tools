import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorFloat } from "~/game-data/parsers/primitives";

import { assertVendorFGBuildableCornerWall } from "./assert";

export function parseFGBuildableCornerWall(
  data: unknown,
): Effect.Effect<FGBuildableCornerWall, ParseError> {
  assertVendorFGBuildableCornerWall(data);

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

export type FGBuildableCornerWall = FGBuildable & {
  width: number;
  height: number;
};
