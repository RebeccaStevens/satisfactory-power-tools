import { Array, Effect, pipe } from "effect";
import type { IterableElement } from "type-fest";

import type { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/parsers/vendorData/types";
import type { Vehicle, WithNativeClass } from "~/game-data/upgrade/types";
import { ClassName } from "~/types";

export function upgradeVehicles(vendorData: VendorData[]) {
  const vehicleNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGGolfCartDispenser'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof vehicleNativeClasses>;
      } => vehicleNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.map(
          (
            vendorVehicle,
          ): Effect.Effect<
            [ClassName, Vehicle & WithNativeClass],
            LookupError
          > =>
            pipe(
              Effect.succeed({
                nativeClass: group.nativeClass,
                className: ClassName(vendorVehicle.className),
              } satisfies Vehicle & WithNativeClass),
              Effect.map((vehicle) => [vehicle.className, vehicle]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
