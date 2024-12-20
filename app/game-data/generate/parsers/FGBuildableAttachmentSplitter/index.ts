import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorInt } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableAttachmentSplitter } from "./assert";

export function parseFGBuildableAttachmentSplitter(
  data: unknown,
): Effect.Effect<FGBuildableAttachmentSplitter, ParseError> {
  assertVendorFGBuildableAttachmentSplitter(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          currentOutputIndex: parseVendorInt(data.mCurrentOutputIndex),
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

export type FGBuildableAttachmentSplitter = FGBuildable & {
  currentOutputIndex: number;
  inventorySize: number;
};
