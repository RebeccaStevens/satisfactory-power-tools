import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorInt } from "~/game-data/parsers/primitives";

import { assertVendorFGBuildableAttachmentMerger } from "./assert";

export function parseFGBuildableAttachmentMerger(
  data: unknown,
): Effect.Effect<FGBuildableAttachmentMerger, ParseError> {
  assertVendorFGBuildableAttachmentMerger(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          currentInputIndex: parseVendorInt(data.mCurrentInputIndex),
          inventorySize: parseVendorInt(data.mInventorySize),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableAttachmentMerger = FGBuildable & {
  currentInputIndex: number;
  inventorySize: number;
};
