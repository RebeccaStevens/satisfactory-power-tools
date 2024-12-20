import { Effect, pipe } from "effect";

import { type FGBuildable, parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGBuildablePriorityPowerSwitch } from "./assert";

export function parseFGBuildablePriorityPowerSwitch(
  data: unknown,
): Effect.Effect<FGBuildablePriorityPowerSwitch, ParseError> {
  assertVendorFGBuildablePriorityPowerSwitch(data);

  return pipe(
    Effect.all([parseFGBuildable(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildablePriorityPowerSwitch = FGBuildable & {};
