import { Effect, pipe } from "effect";

import {
  type FGItemDescriptor,
  parseFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor";
import type { ParseError } from "~/game-data/parsers/errors";
import {
  parseVendorFloat,
  parseVendorString,
} from "~/game-data/parsers/primitives";

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
          powerShardType: parseVendorString(data.mPowerShardType),
          extraPotential: parseVendorFloat(data.mExtraPotential),
          extraProductionBoost: parseVendorFloat(data.mExtraProductionBoost),
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
