import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorInt } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGCentralStorageContainer } from "./assert";

export function parseFGCentralStorageContainer(data: unknown): Effect.Effect<FGCentralStorageContainer, ParseError> {
  assertVendorFGCentralStorageContainer(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          inventorySizeX: parseVendorInt(data.mInventorySizeX),
          inventorySizeY: parseVendorInt(data.mInventorySizeY),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGCentralStorageContainer = FGBuildable & {
  inventorySizeX: number;
  inventorySizeY: number;
};
