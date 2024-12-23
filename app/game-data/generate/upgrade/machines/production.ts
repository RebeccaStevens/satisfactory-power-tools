import { Array, Effect, pipe } from "effect";
import * as uom from "effect-uom";
import type { IterableElement } from "type-fest";

import type { VendorData } from "~/game-data/generate/parsers/types";
import type { ProductionMachine, WithNativeClass } from "~/game-data/generate/upgrade/types";
import { ClassName } from "~/game-data/types";
import { Int } from "~/types";

export function upgradeProductionMachines(
  vendorData: VendorData[],
): Effect.Effect<Array<[ClassName, ProductionMachine & WithNativeClass]>> {
  const productionMachineNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof productionMachineNativeClasses>;
      } => productionMachineNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.map(
          (vendor): Effect.Effect<[ClassName, ProductionMachine & WithNativeClass]> =>
            pipe(
              Effect.succeed({
                nativeClass: group.nativeClass,
                className: ClassName(vendor.className),

                building: undefined as any,
                displayName: vendor.displayName,

                power:
                  "maximumPowerConsumption" in vendor
                    ? {
                        min: uom.Power<uom.Mega<uom.Watt>>(-vendor.minimumPowerConsumption),
                        max: uom.Power<uom.Mega<uom.Watt>>(-vendor.maximumPowerConsumption),
                      }
                    : {
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
                  multiplier: uom.Unitless(vendor.productionShardBoostMultiplier),
                  slots: Int(vendor.productionShardSlotSize),
                  exponent: uom.Unitless(vendor.productionBoostPowerConsumptionExponent),
                },
              } satisfies ProductionMachine & WithNativeClass),
              Effect.map((item) => [item.className, item]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
