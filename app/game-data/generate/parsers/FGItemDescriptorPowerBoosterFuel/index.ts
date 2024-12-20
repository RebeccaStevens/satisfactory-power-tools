import { Effect, pipe } from "effect";

import { type FGItemDescriptor, parseFGItemDescriptor } from "~/game-data/generate/parsers/FGItemDescriptor";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGItemDescriptorPowerBoosterFuel } from "./assert";

export function parseFGItemDescriptorPowerBoosterFuel(
  data: unknown,
): Effect.Effect<FGItemDescriptorPowerBoosterFuel, ParseError> {
  assertVendorFGItemDescriptorPowerBoosterFuel(data);

  return pipe(
    Effect.all([
      parseFGItemDescriptor(data),
      pipe(
        Effect.all({
          boostPercentage: parseVendorFloat(data.mBoostPercentage),
          boostDuration: parseVendorFloat(data.mBoostDuration),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGItemDescriptorPowerBoosterFuel = FGItemDescriptor & {
  boostPercentage: number;
  boostDuration: number;
};
