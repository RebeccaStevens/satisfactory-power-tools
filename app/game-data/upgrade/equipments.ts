import { Array, Effect, pipe } from "effect";
import type { IterableElement } from "type-fest";

import type { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/parsers/vendorData/types";
import type { Equipment, WithNativeClass } from "~/game-data/upgrade/types";
import { ClassName } from "~/types";

export function upgradeEquipments(vendorData: VendorData[]) {
  const equipmentNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGWeapon'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGSuitBase'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableEquipment'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGChargedWeapon'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGPortableMinerDispenser'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentStunSpear'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGObjectScanner'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGHoverPack'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGJetPack'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGChainsaw'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGJumpingStilts'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentZipline'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGGasMask'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGParachute'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof equipmentNativeClasses>;
      } => equipmentNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.map(
          (
            vendorEquipment,
          ): Effect.Effect<
            [ClassName, Equipment & WithNativeClass],
            LookupError
          > =>
            pipe(
              Effect.succeed({
                nativeClass: group.nativeClass,
                className: ClassName(vendorEquipment.className),
              } satisfies Equipment & WithNativeClass),
              Effect.map((equipment) => [equipment.className, equipment]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
