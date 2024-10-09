import { Array, Effect, pipe } from "effect";
import * as uom from "effect-uom";
import type { IterableElement } from "type-fest";

import type { VendorData } from "~/game-data/parsers/vendorData/types";
import type { SinkMachine, WithNativeClass } from "~/game-data/upgrade/types";
import { ClassName, Int } from "~/types";

export function upgradeSinkMachines(vendorData: VendorData[]) {
  const sinkMachineNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof sinkMachineNativeClasses>;
      } => sinkMachineNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.map(
          (vendor): Effect.Effect<[ClassName, SinkMachine & WithNativeClass]> =>
            pipe(
              Effect.succeed({
                nativeClass: group.nativeClass,
                className: ClassName(vendor.className),

                building: undefined as any,
                displayName: vendor.displayName,

                power: {
                  min: uom.Power<uom.Mega<uom.Watt>>(-vendor.powerConsumption),
                  max: uom.Power<uom.Mega<uom.Watt>>(-vendor.powerConsumption),
                },

                overclock: {
                  canChange: vendor.canChangePotential,
                  min: uom.Unitless(vendor.minPotential),
                  max: uom.Unitless(vendor.maxPotential),
                  slots: Int(vendor.canChangePotential ? 3 : 0),
                  exponent: uom.Unitless(vendor.powerConsumptionExponent),
                },

                sloop: {
                  canChange: vendor.canChangeProductionBoost,
                  base: uom.Unitless(vendor.baseProductionBoost),
                  multiplier: uom.Unitless(
                    vendor.productionShardBoostMultiplier,
                  ),
                  slots: Int(vendor.productionShardSlotSize),
                  exponent: uom.Unitless(
                    vendor.productionBoostPowerConsumptionExponent,
                  ),
                },
              } satisfies SinkMachine & WithNativeClass),
              Effect.map((item) => [item.className, item]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
