import { Effect, pipe } from "effect";

import { type FGBuildableFactory, parseFGBuildableFactory } from "~/game-data/generate/parsers/FGBuildableFactory";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat, parseVendorInt } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableFrackingExtractor } from "./assert";

export function parseFGBuildableFrackingExtractor(
  data: unknown,
): Effect.Effect<FGBuildableFrackingExtractor, ParseError> {
  assertVendorFGBuildableFrackingExtractor(data);

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

export type FGBuildableFrackingExtractor = FGBuildableFactory & {
  extractCycleTime: number;
  itemsPerCycle: number;
};
