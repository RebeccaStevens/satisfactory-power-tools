import { Effect, pipe } from "effect";

import { MegaWatt, Second, Unitless } from "~/types";

import { type FGBuildable, parseFGBuildable } from "../FGBuildable";
import type { ParseError } from "../errors";
import { parseBoolean, parseFloat, parseInt } from "../primitives";

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
          powerConsumption: parseFloat(data.mPowerConsumption).pipe(
            Effect.map(MegaWatt),
          ),
          powerConsumptionExponent: parseFloat(
            data.mPowerConsumptionExponent,
          ).pipe(Effect.map(Unitless)),
          productionBoostPowerConsumptionExponent: parseFloat(
            data.mProductionBoostPowerConsumptionExponent,
          ).pipe(Effect.map(Unitless)),
          minimumProducingTime: parseFloat(data.mMinimumProducingTime).pipe(
            Effect.map(Second),
          ),
          minimumStoppedTime: parseFloat(data.mMinimumStoppedTime).pipe(
            Effect.map(Second),
          ),
          canEverMonitorProductivity: parseBoolean(
            data.mCanEverMonitorProductivity,
          ),
          canChangePotential: parseBoolean(data.mCanChangePotential),
          canChangeProductionBoost: parseBoolean(
            data.mCanChangeProductionBoost,
          ),
          minPotential: parseFloat(data.mMinPotential),
          maxPotential: parseFloat(data.mMaxPotential),
          baseProductionBoost: parseFloat(data.mBaseProductionBoost),
          potentialShardSlots: parseInt(data.mPotentialShardSlots),
          productionShardSlotSize: parseInt(data.mProductionShardSlotSize),
          productionShardBoostMultiplier: parseFloat(
            data.mProductionShardBoostMultiplier,
          ),
          hasInventoryPotential: parseBoolean(data.mHasInventoryPotential),
          isTickRateManaged: parseBoolean(data.mIsTickRateManaged),
          effectUpdateInterval: parseFloat(data.mEffectUpdateInterval).pipe(
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

export type FGBuildableFactory = FGBuildable & {
  powerConsumption: MegaWatt;
  powerConsumptionExponent: Unitless;
  productionBoostPowerConsumptionExponent: Unitless;
  minimumProducingTime: Second;
  minimumStoppedTime: Second;
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
  effectUpdateInterval: Second;
};
