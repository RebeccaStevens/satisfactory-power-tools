import { Effect, pipe } from "effect";

import {
  type FGBuildingDescriptor,
  parseFGBuildingDescriptor,
} from "~/game-data/parsers/FGBuildingDescriptor";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGPoleDescriptor } from "./assert";

export function parseFGPoleDescriptor(
  data: unknown,
): Effect.Effect<FGPoleDescriptor, ParseError> {
  assertVendorFGPoleDescriptor(data);

  return pipe(
    Effect.all([parseFGBuildingDescriptor(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGPoleDescriptor = FGBuildingDescriptor & {};
