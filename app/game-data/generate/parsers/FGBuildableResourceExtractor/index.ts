import { Effect, pipe } from "effect";

import { type FGBuildableFactory, parseFGBuildableFactory } from "~/game-data/generate/parsers/FGBuildableFactory";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat, parseVendorInt } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableResourceExtractor } from "./assert";

export function parseFGBuildableResourceExtractor(
  data: unknown,
): Effect.Effect<FGBuildableResourceExtractor, ParseError> {
  assertVendorFGBuildableResourceExtractor(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          extractCycleTime: parseVendorFloat(data.mExtractCycleTime),
          itemsPerCycle: parseVendorInt(data.mItemsPerCycle),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableResourceExtractor = FGBuildableFactory & {
  extractCycleTime: number;
  itemsPerCycle: number;
};
