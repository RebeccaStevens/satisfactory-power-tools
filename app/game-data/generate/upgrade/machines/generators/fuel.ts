import { Array, Effect, pipe } from "effect";
import * as uom from "effect-uom";
import type { IterableElement } from "type-fest";

import type { VendorData } from "~/game-data/generate/parsers/types";
import type { GeneratorFuelMachine, Item, WithNativeClass } from "~/game-data/generate/upgrade/types";
import { ClassName } from "~/game-data/types";
import { Int } from "~/types";

export function upgradeGeneratorFuelMachines(
  vendorData: VendorData[],
  items: Map<ClassName, Item>,
): Effect.Effect<Array<[ClassName, GeneratorFuelMachine & WithNativeClass]>> {
  const generatorFuelMachineNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof generatorFuelMachineNativeClasses>;
      } => generatorFuelMachineNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.map(
          (vendor): Effect.Effect<[ClassName, GeneratorFuelMachine & WithNativeClass]> =>
            pipe(
              Effect.succeed({
                building: undefined as any,
                nativeClass: group.nativeClass,

                className: ClassName(vendor.className),
                displayName: vendor.displayName,

                power: {
                  min: uom.Power<uom.Mega<uom.Watt>>(vendor.powerProduction),
                  max: uom.Power<uom.Mega<uom.Watt>>(vendor.powerProduction),
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
              } satisfies GeneratorFuelMachine & WithNativeClass),
              Effect.map((item) => [item.className, item]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
