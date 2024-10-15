import { Effect, pipe } from "effect";

import { ItemsPerCycle, Second } from "~/types";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "../FGBuildableFactory";
import type { ParseError } from "../errors";
import { parseFloat, parseInt } from "../primitives";

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

export type FGBuildableFrackingExtractor = FGBuildableFactory & {
  extractCycleTime: Second;
  itemsPerCycle: ItemsPerCycle;
};
