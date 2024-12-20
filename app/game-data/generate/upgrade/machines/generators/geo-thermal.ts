import { Array, Effect, pipe } from "effect";
import * as uom from "effect-uom";
import type { IterableElement } from "type-fest";

import type { VendorData } from "~/game-data/generate/parsers/types";
import type { GeneratorGeoThermalMachine, WithNativeClass } from "~/game-data/generate/upgrade/types";
import { ClassName } from "~/game-data/types";
import { Int } from "~/types";

export function upgradeGeneratorGeoThermalMachines(vendorData: VendorData[]) {
  const generatorGeoThermalMachineNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof generatorGeoThermalMachineNativeClasses>;
      } => generatorGeoThermalMachineNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.map(
          (vendor): Effect.Effect<[ClassName, GeneratorGeoThermalMachine & WithNativeClass]> =>
            pipe(
              Effect.succeed({
                building: undefined as any,
                nativeClass: group.nativeClass,
                className: ClassName(vendor.className),
                displayName: vendor.displayName,

                power: {
                  min: uom.Power<uom.Mega<uom.Watt>>(vendor.variablePowerProductionFactor * 0.5),
                  max: uom.Power<uom.Mega<uom.Watt>>(vendor.variablePowerProductionFactor * 1.5),
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
              } satisfies GeneratorGeoThermalMachine & WithNativeClass),
              Effect.map((item) => [item.className, item]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
