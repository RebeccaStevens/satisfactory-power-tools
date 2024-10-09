import { Effect, pipe } from "effect";

import { ResourceSinkPoints } from "~/types";

import {
  type FGBuildingDescriptor,
  parseFGBuildingDescriptor,
} from "../FGBuildingDescriptor";
import type { ParseError } from "../errors";
import { parseInt } from "../primitives";

import { assertVendorFGItemDescriptor } from "./assert";

export function parseFGItemDescriptor(
  data: unknown,
): Effect.Effect<FGItemDescriptor, ParseError> {
  assertVendorFGItemDescriptor(data);

  return pipe(
    Effect.all([
      parseFGBuildingDescriptor(data),
      pipe(
        Effect.all({
          resourceSinkPoints: parseInt(data.mResourceSinkPoints).pipe(
            Effect.map(ResourceSinkPoints),
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

export type FGItemDescriptor = FGBuildingDescriptor & {
  resourceSinkPoints: ResourceSinkPoints;
};
