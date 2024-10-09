import { Effect, pipe } from "effect";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "~/game-data/parsers/FGBuildableFactory";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorFloat } from "~/game-data/parsers/primitives";

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
          processingTime: parseVendorFloat(data.mProcessingTime),
          producingTimer: parseVendorFloat(data.mProducingTimer),
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
  processingTime: number;
  producingTimer: number;
};
