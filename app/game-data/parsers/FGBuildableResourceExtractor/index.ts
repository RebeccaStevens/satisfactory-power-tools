import { Effect, pipe } from "effect";

import { ItemsPerCycle, Second } from "~/types";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "../FGBuildableFactory";
import type { ParseError } from "../errors";
import { parseFloat, parseInt } from "../primitives";

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
          extractCycleTime: parseFloat(data.mExtractCycleTime).pipe(
            Effect.map(Second),
          ),
          itemsPerCycle: parseInt(data.mItemsPerCycle).pipe(
            Effect.map(ItemsPerCycle),
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

export type FGBuildableResourceExtractor = FGBuildableFactory & {
  extractCycleTime: Second;
  itemsPerCycle: ItemsPerCycle;
};
