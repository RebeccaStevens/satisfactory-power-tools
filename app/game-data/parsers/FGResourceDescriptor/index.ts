import { Effect, pipe } from "effect";

import { Unitless } from "~/types";

import {
  type FGItemDescriptor,
  parseFGItemDescriptor,
} from "../FGItemDescriptor";
import type { ParseError } from "../errors";
import { parseFloat } from "../primitives";

import { assertVendorFGResourceDescriptor } from "./assert";

export function parseFGResourceDescriptor(
  data: unknown,
): Effect.Effect<FGResourceDescriptor, ParseError> {
  assertVendorFGResourceDescriptor(data);

  return pipe(
    Effect.all([
      parseFGItemDescriptor(data),
      pipe(
        Effect.all({
          collectSpeedMultiplier: parseFloat(data.mCollectSpeedMultiplier).pipe(
            Effect.map(Unitless),
          ),
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
  collectSpeedMultiplier: Unitless;
};
