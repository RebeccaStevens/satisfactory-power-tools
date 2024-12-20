import { Array, Effect, pipe } from "effect";
import type { IterableElement } from "type-fest";

import type { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/generate/parsers/types";
import { exclude } from "~/game-data/generate/upgrade/common";
import type { Schematic, WithNativeClass } from "~/game-data/generate/upgrade/types";
import { ClassName } from "~/game-data/types";

export function upgradeSchematics(vendorData: VendorData[]) {
  const schematicNativeClasses = new Set(["/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'"] as const);

  return pipe(
    vendorData,
    Array.filter(
      (
        group,
      ): group is VendorData & {
        nativeClass: IterableElement<typeof schematicNativeClasses>;
      } => schematicNativeClasses.has(group.nativeClass),
    ),
    Array.flatMap((group) =>
      pipe(
        group.classes,
        Array.filter<(typeof group.classes)[number]>((vendorBuildable) => !exclude.has(vendorBuildable.className)),
        Array.map(
          (vendorSchematic): Effect.Effect<[ClassName, Schematic & WithNativeClass], LookupError> =>
            pipe(
              Effect.succeed({
                nativeClass: group.nativeClass,
                className: ClassName(vendorSchematic.className),
              } satisfies Schematic & WithNativeClass),
              Effect.map((schematic) => [schematic.className, schematic]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
