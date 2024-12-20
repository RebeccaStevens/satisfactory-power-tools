import { Effect, pipe } from "effect";

import {
  type FGBuildingDescriptor,
  parseFGBuildingDescriptor,
} from "~/game-data/generate/parsers/FGBuildingDescriptor";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorInt } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGItemDescriptor } from "./assert";

export function parseFGItemDescriptor(data: unknown): Effect.Effect<FGItemDescriptor, ParseError> {
  assertVendorFGItemDescriptor(data);

  return pipe(
    Effect.all([
      parseFGBuildingDescriptor(data),
      pipe(
        Effect.all({
          resourceSinkPoints: parseVendorInt(data.mResourceSinkPoints),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGItemDescriptor = FGBuildingDescriptor & {
  resourceSinkPoints: number;
};
