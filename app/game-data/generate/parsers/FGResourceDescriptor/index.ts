import { Effect, pipe } from "effect";

import { type FGItemDescriptor, parseFGItemDescriptor } from "~/game-data/generate/parsers/FGItemDescriptor";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGResourceDescriptor } from "./assert";

export function parseFGResourceDescriptor(data: unknown): Effect.Effect<FGResourceDescriptor, ParseError> {
  assertVendorFGResourceDescriptor(data);

  return pipe(
    Effect.all([
      parseFGItemDescriptor(data),
      pipe(
        Effect.all({
          collectSpeedMultiplier: parseVendorFloat(data.mCollectSpeedMultiplier),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGResourceDescriptor = FGItemDescriptor & {
  collectSpeedMultiplier: number;
};
