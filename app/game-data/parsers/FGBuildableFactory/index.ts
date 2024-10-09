import { Effect, pipe } from "effect";

import {
  type FGBuildable,
  parseFGBuildable,
} from "~/game-data/parsers/FGBuildable";
import type { ParseError } from "~/game-data/parsers/errors";
import {
  parseVendorBoolean,
  parseVendorFloat,
  parseVendorInt,
} from "~/game-data/parsers/primitives";

import { assertVendorFGBuildableFactory } from "./assert";

export function parseFGBuildableFactory(
  data: unknown,
): Effect.Effect<FGBuildableFactory, ParseError> {
  assertVendorFGBuildableFactory(data);

  return pipe(
    Effect.all([
      parseFGBuildable(data),
      pipe(
        Effect.all({
          powerConsumption: parseVendorFloat(data.mPowerConsumption),
          powerConsumptionExponent: parseVendorFloat(
            data.mPowerConsumptionExponent,
          ),
          productionBoostPowerConsumptionExponent: parseVendorFloat(
            data.mProductionBoostPowerConsumptionExponent,
          ),
          minimumProducingTime: parseVendorFloat(data.mMinimumProducingTime),
          minimumStoppedTime: parseVendorFloat(data.mMinimumStoppedTime),
          canEverMonitorProductivity: parseVendorBoolean(
            data.mCanEverMonitorProductivity,
          ),
          canChangePotential: parseVendorBoolean(data.mCanChangePotential),
          canChangeProductionBoost: parseVendorBoolean(
            data.mCanChangeProductionBoost,
          ),
          minPotential: parseVendorFloat(data.mMinPotential),
          maxPotential: parseVendorFloat(data.mMaxPotential),
          baseProductionBoost: parseVendorFloat(data.mBaseProductionBoost),
          potentialShardSlots: parseVendorInt(data.mPotentialShardSlots),
          productionShardSlotSize: parseVendorInt(
            data.mProductionShardSlotSize,
          ),
          productionShardBoostMultiplier: parseVendorFloat(
            data.mProductionShardBoostMultiplier,
          ),
          hasInventoryPotential: parseVendorBoolean(
            data.mHasInventoryPotential,
          ),
          isTickRateManaged: parseVendorBoolean(data.mIsTickRateManaged),
          effectUpdateInterval: parseVendorFloat(data.mEffectUpdateInterval),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableFactory = FGBuildable & {
  powerConsumption: number;
  powerConsumptionExponent: number;
  productionBoostPowerConsumptionExponent: number;
  minimumProducingTime: number;
  minimumStoppedTime: number;
  canEverMonitorProductivity: boolean;
  canChangePotential: boolean;
  canChangeProductionBoost: boolean;
  minPotential: number;
  maxPotential: number;
  baseProductionBoost: number;
  potentialShardSlots: number;
  productionShardSlotSize: number;
  productionShardBoostMultiplier: number;
  hasInventoryPotential: boolean;
  isTickRateManaged: boolean;
  effectUpdateInterval: number;
};
