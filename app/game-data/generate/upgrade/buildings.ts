import { Array, Effect, pipe } from "effect";
import * as uom from "effect-uom";
import type { IterableElement } from "type-fest";

import { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/generate/parsers/types";
import { buildingClassToBuildableClass } from "~/game-data/generate/upgrade/building-to-buildable";
import { exclude, upgradeAssetPath } from "~/game-data/generate/upgrade/common";
import type { Buildable, Building, WithNativeClass } from "~/game-data/generate/upgrade/types";
import { ClassName } from "~/game-data/types";

export function upgradeBuildings(
  vendorData: VendorData[],
  buildables: Map<ClassName, Buildable>,
): Effect.Effect<Array<[ClassName, Building & WithNativeClass]>, LookupError> {
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
        Array.filter<(typeof group.classes)[number]>((vendorBuildable) => !exclude.has(vendorBuildable.className)),
        Array.map(
          (vendorBuilding): Effect.Effect<[ClassName, Building & WithNativeClass], LookupError> =>
            pipe(
              Effect.all({
                buildable: (() => {
                  const buildableClassName = buildingClassToBuildableClass[vendorBuilding.className];

                  if (buildableClassName === undefined) {
                    return Effect.fail(
                      new LookupError(`Failed to find buildableClassName for "${vendorBuilding.className}"`),
                    );
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
                    return Effect.dieMessage(`Buildable "${buildable.className}" shouldn't have a building set yet.`);
                  }

                  return Effect.succeed(buildable);
                })(),
              }),
              Effect.map((values) => {
                const building = {
                  ...values,
                  nativeClass: group.nativeClass,
                  className: ClassName(vendorBuilding.className),

                  energyValue: uom.Energy<uom.Mega<uom.Joule>>(vendorBuilding.energyValue),
                  radioactiveDecay: uom.Gray(vendorBuilding.radioactiveDecay),
                  icon: upgradeAssetPath(vendorBuilding.icon),
                } satisfies Building & WithNativeClass;

                // eslint-disable-next-line functional/no-expression-statements, functional/immutable-data
                building.buildable.building = building;

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
