import { Array, Effect, pipe } from "effect";
import * as uom from "effect-uom";
import type { IterableElement } from "type-fest";

import type { VendorData } from "~/game-data/parsers/vendorData/types";
import { upgradeAssetPath } from "~/game-data/upgrade/common";
import type { Item, WithNativeClass } from "~/game-data/upgrade/types";
import { ClassName, ResourceSinkPoint } from "~/types";

export function upgradeItems(vendorData: VendorData[]) {
  const itemNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorPowerBoosterFuel'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGPowerShardDescriptor'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof itemNativeClasses>;
      } => itemNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.map(
          (vendorItem): Effect.Effect<[ClassName, Item & WithNativeClass]> =>
            pipe(
              Effect.succeed({
                nativeClass: group.nativeClass,
                className: ClassName(vendorItem.className),
                displayName: vendorItem.displayName,
                form: vendorItem.form,
                energyValue: uom.Energy<uom.Mega<uom.Joule>>(
                  vendorItem.energyValue,
                ),
                radioactiveDecay: uom.Gray(vendorItem.radioactiveDecay),
                icon: upgradeAssetPath(vendorItem.icon),
                resourceSinkPoints: ResourceSinkPoint(
                  vendorItem.resourceSinkPoints,
                ),
              } satisfies Item & WithNativeClass),
              Effect.map((item) => [item.className, item]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
