import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorBoolean, parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableDoor } from "./assert";

export function parseFGBuildableDoor(data: unknown): Effect.Effect<FGBuildableDoor, ParseError> {
  assertVendorFGBuildableDoor(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          canBeLocked: parseVendorBoolean(data.mCanBeLocked),
          width: parseVendorFloat(data.mWidth),
          height: parseVendorFloat(data.mHeight),
          elevation: parseVendorFloat(data.mElevation),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableDoor = FGBuildable & {
  canBeLocked: boolean;
  width: number;
  height: number;
  elevation: number;
};
