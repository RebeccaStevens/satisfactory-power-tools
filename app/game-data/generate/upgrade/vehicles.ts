import { Array, Effect, pipe } from "effect";
import type { IterableElement } from "type-fest";

import type { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/generate/parsers/types";
import { exclude } from "~/game-data/generate/upgrade/common";
import type { Vehicle, WithNativeClass } from "~/game-data/generate/upgrade/types";
import { ClassName } from "~/game-data/types";

export function upgradeVehicles(
  vendorData: VendorData[],
): Effect.Effect<Array<[ClassName, Vehicle & WithNativeClass]>, LookupError> {
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
        Array.filter<(typeof group.classes)[number]>((vendorBuildable) => !exclude.has(vendorBuildable.className)),
        Array.map(
          (vendorVehicle): Effect.Effect<[ClassName, Vehicle & WithNativeClass], LookupError> =>
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
