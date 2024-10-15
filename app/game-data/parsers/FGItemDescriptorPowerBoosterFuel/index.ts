import { Effect, pipe } from "effect";

import { Second, Unitless } from "~/types";

import {
  type FGItemDescriptor,
  parseFGItemDescriptor,
} from "../FGItemDescriptor";
import type { ParseError } from "../errors";
import { parseFloat } from "../primitives";

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
          boostPercentage: parseFloat(data.mBoostPercentage).pipe(
            Effect.map(Unitless),
          ),
          boostDuration: parseFloat(data.mBoostDuration).pipe(
            Effect.map(Second),
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

export type FGItemDescriptorPowerBoosterFuel = FGItemDescriptor & {
  boostPercentage: Unitless;
  boostDuration: Second;
};
