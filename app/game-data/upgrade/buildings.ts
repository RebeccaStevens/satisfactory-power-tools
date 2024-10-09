import { Array, Effect, pipe } from "effect";
import * as uom from "effect-uom";
import type { IterableElement } from "type-fest";

import { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/parsers/vendorData/types";
import { buildingClassToBuildableClass } from "~/game-data/upgrade/building-to-buildable";
import { upgradeAssetPath } from "~/game-data/upgrade/common";
import type {
  Buildable,
  Building,
  WithNativeClass,
} from "~/game-data/upgrade/types";
import { ClassName } from "~/types";

export function upgradeBuildings(
  vendorData: VendorData[],
  buildables: Map<ClassName, Buildable>,
) {
  const buildingNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGPoleDescriptor'",
  ] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof buildingNativeClasses>;
      } => buildingNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.map(
          (
            vendorBuilding,
          ): Effect.Effect<
            [ClassName, Building & WithNativeClass],
            LookupError
          > =>
            pipe(
              Effect.all({
                buildable: (() => {
                  const buildableClassName =
                    buildingClassToBuildableClass[vendorBuilding.className];

                  if (buildableClassName === null) {
                    return Effect.succeed(null);
                  }

                  const buildable = buildables.get(buildableClassName);

                  if (buildable === undefined) {
                    return Effect.fail(
                      new LookupError(
                        `Failed to find buildable with class "${buildableClassName}" for "${vendorBuilding.className}"`,
                      ),
                    );
                  }

                  // eslint-disable-next-line ts/no-unnecessary-condition
                  if (buildable.building !== undefined) {
                    return Effect.dieMessage(
                      `Buildable "${buildable.className}" shouldn't have a building set yet.`,
                    );
                  }

                  return Effect.succeed(buildable);
                })(),
              }),
              Effect.map((values) => {
                const building = {
                  ...values,
                  nativeClass: group.nativeClass,
                  className: ClassName(vendorBuilding.className),

                  energyValue: uom.Energy<uom.Mega<uom.Joule>>(
                    vendorBuilding.energyValue,
                  ),
                  radioactiveDecay: uom.Gray(vendorBuilding.radioactiveDecay),
                  icon: upgradeAssetPath(vendorBuilding.icon),
                } satisfies Building & WithNativeClass;

                // eslint-disable-next-line functional/no-conditional-statements
                if (building.buildable !== null) {
                  // eslint-disable-next-line functional/immutable-data
                  building.buildable.building = building;
                }

                return building;
              }),
              Effect.map((building) => [building.className, building]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
