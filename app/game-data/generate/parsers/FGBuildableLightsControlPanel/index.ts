import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildableLightsControlPanel } from "./assert";

export function parseFGBuildableLightsControlPanel(
  data: unknown,
): Effect.Effect<FGBuildableLightsControlPanel, ParseError> {
  assertVendorFGBuildableLightsControlPanel(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableLightsControlPanel = FGBuildable & {};
