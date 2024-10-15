import { Effect, pipe } from "effect";

import { Second } from "~/types";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "../FGBuildableFactory";
import type { ParseError } from "../errors";
import { parseFloat } from "../primitives";

import { assertVendorFGBuildableResourceSink } from "./assert";

export function parseFGBuildableResourceSink(
  data: unknown,
): Effect.Effect<FGBuildableResourceSink, ParseError> {
  assertVendorFGBuildableResourceSink(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          processingTime: parseFloat(data.mProcessingTime).pipe(
            Effect.map(Second),
          ),
          producingTimer: parseFloat(data.mProducingTimer).pipe(
            Effect.map(Second),
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

export type FGBuildableResourceSink = FGBuildableFactory & {
  processingTime: Second;
  producingTimer: Second;
};
