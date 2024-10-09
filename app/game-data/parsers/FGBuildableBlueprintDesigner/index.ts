import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import { parseVendorSizeInFoundations3D } from "~/game-data/parsers/common";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorFloat } from "~/game-data/parsers/primitives";

import { assertVendorFGBuildableBlueprintDesigner } from "./assert";

export function parseFGBuildableBlueprintDesigner(
  data: unknown,
): Effect.Effect<FGBuildableBlueprintDesigner, ParseError> {
  assertVendorFGBuildableBlueprintDesigner(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          terminalDistanceFromEdge: parseVendorFloat(
            data.mTerminalDistanceFromEdge,
          ),
          terminalHalfDepth: parseVendorFloat(data.mTerminalHalfDepth),
          dimensions: parseVendorSizeInFoundations3D(data.mDimensions),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableBlueprintDesigner = FGBuildable & {
  terminalDistanceFromEdge: number;
  terminalHalfDepth: number;
  dimensions: { x: number; y: number; z: number };
};
