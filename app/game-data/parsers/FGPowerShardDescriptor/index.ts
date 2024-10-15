import { Effect, pipe } from "effect";

import {
  type FGItemDescriptor,
  parseFGItemDescriptor,
} from "../FGItemDescriptor";
import type { ParseError } from "../errors";
import { parseFloat, parseString } from "../primitives";

import { assertVendorFGPowerShardDescriptor } from "./assert";

export function parseFGPowerShardDescriptor(
  data: unknown,
): Effect.Effect<FGPowerShardDescriptor, ParseError> {
  assertVendorFGPowerShardDescriptor(data);

  return pipe(
    Effect.all([
      parseFGItemDescriptor(data),
      pipe(
        Effect.all({
          powerShardType: parseString(data.mPowerShardType),
          extraPotential: parseFloat(data.mExtraPotential),
          extraProductionBoost: parseFloat(data.mExtraProductionBoost),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGPowerShardDescriptor = FGItemDescriptor & {
  powerShardType: string;
  extraPotential: number;
  extraProductionBoost: number;
};
