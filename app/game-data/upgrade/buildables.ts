import { Array, Effect, pipe } from "effect";
import type { IterableElement } from "type-fest";

import type { LookupError } from "~/errors";
import type { VendorData } from "~/game-data/parsers/vendorData/types";
import type { Buildable, WithNativeClass } from "~/game-data/upgrade/types";
import { ClassName } from "~/types";

export function upgradeBuildables(vendorData: VendorData[]) {
  const buildingNativeClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeamLightweight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWallLightweight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactoryBuilding'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundationLightweight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthrough'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthroughPipeHyper'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillarLightweight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineSupport'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleBase'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleLightweight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortal'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortalSatellite'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerBooster'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePriorityPowerSwitch'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRampLightweight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowCannon'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowDispenser'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTradingPost'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkway'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkwayLightweight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWall'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWallLightweight'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGCentralStorageContainer'",
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
            vendorBuildable,
          ): Effect.Effect<
            [ClassName, Buildable & WithNativeClass],
            LookupError
          > =>
            pipe(
              Effect.succeed({
                nativeClass: group.nativeClass,
                className: ClassName(vendorBuildable.className),

                building: undefined as any,
                displayName: vendorBuildable.displayName,
              } satisfies Buildable & WithNativeClass),
              Effect.map((building) => [building.className, building]),
            ),
        ),
      ),
    ),
    Effect.all,
  );
}
