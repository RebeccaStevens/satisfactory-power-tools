import { assert } from "chai";
import { Array, Effect, Option, pipe } from "effect";

import { parseFGAmmoTypeInstantHit } from "../FGAmmoTypeInstantHit";
import { parseFGAmmoTypeProjectile } from "../FGAmmoTypeProjectile";
import { parseFGAmmoTypeSpreadshot } from "../FGAmmoTypeSpreadshot";
import { parseFGBuildable } from "../FGBuildable";
import { parseFGBuildableFactory } from "../FGBuildableFactory";
import { parseFGBuildableFactoryBuilding } from "../FGBuildableFactoryBuilding";
import { parseFGBuildableFactorySimpleProducer } from "../FGBuildableFactorySimpleProducer";
import { parseFGBuildableFrackingActivator } from "../FGBuildableFrackingActivator";
import { parseFGBuildableFrackingExtractor } from "../FGBuildableFrackingExtractor";
import { parseFGBuildableGeneratorFuel } from "../FGBuildableGeneratorFuel";
import { parseFGBuildableGeneratorGeoThermal } from "../FGBuildableGeneratorGeoThermal";
import { parseFGBuildableGeneratorNuclear } from "../FGBuildableGeneratorNuclear";
import { parseFGBuildableManufacturer } from "../FGBuildableManufacturer";
import { parseFGBuildableManufacturerVariablePower } from "../FGBuildableManufacturerVariablePower";
import { parseFGBuildableResourceExtractor } from "../FGBuildableResourceExtractor";
import { parseFGBuildableResourceSink } from "../FGBuildableResourceSink";
import { parseFGBuildingDescriptor } from "../FGBuildingDescriptor";
import { parseFGConsumableDescriptor } from "../FGConsumableDescriptor";
import { parseFGCustomizationRecipe } from "../FGCustomizationRecipe";
import { parseFGEquipmentDescriptor } from "../FGEquipmentDescriptor";
import { parseFGItemDescriptor } from "../FGItemDescriptor";
import { parseFGItemDescriptorBiomass } from "../FGItemDescriptorBiomass";
import { parseFGItemDescriptorNuclearFuel } from "../FGItemDescriptorNuclearFuel";
import { parseFGItemDescriptorPowerBoosterFuel } from "../FGItemDescriptorPowerBoosterFuel";
import { parseFGPowerShardDescriptor } from "../FGPowerShardDescriptor";
import { parseFGRecipe } from "../FGRecipe";
import { parseFGResourceDescriptor } from "../FGResourceDescriptor";
import { ParseError } from "../errors";

import type { VendorData, VendorDataFor, VendorDataShape } from "./types";

/**
 * Parse the vendor data.
 */
export function parseVendorData(
  vendorData: unknown[],
): Effect.Effect<VendorData[], ParseError> {
  return pipe(
    vendorData,
    Effect.forEach(parseVendorNativeClassListShape),
    Effect.flatMap(Effect.forEach(parseNativeClassList)),
    Effect.map((vendorDataOptions) =>
      pipe(
        vendorDataOptions,
        Array.filter(Option.isSome),
        Array.map(Option.getOrThrow),
      ),
    ),
  );
}

/**
 * Parse a native class list.
 */
function parseNativeClassList({
  NativeClass,
  Classes,
}: VendorDataShape): Effect.Effect<Option.Option<VendorData>, ParseError> {
  switch (NativeClass) {
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildingDescriptor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGItemDescriptor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGItemDescriptorBiomass),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGItemDescriptorNuclearFuel),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorPowerBoosterFuel'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGItemDescriptorPowerBoosterFuel),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGResourceDescriptor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGConsumableDescriptor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGEquipmentDescriptor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPowerShardDescriptor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGPowerShardDescriptor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGRecipe),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGCustomizationRecipe'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGCustomizationRecipe),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGAmmoTypeInstantHit),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGAmmoTypeProjectile),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGAmmoTypeSpreadshot),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildable),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableFactory),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactoryBuilding'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableFactoryBuilding),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableFactorySimpleProducer),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableManufacturer),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableManufacturerVariablePower),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableGeneratorFuel),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableGeneratorGeoThermal),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableGeneratorNuclear),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableFrackingActivator),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableFrackingExtractor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableResourceExtractor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableResourceSink),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortal'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortalSatellite'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeamLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWallLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundationLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthrough'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthroughPipeHyper'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillarLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineSupport'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleBase'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerBooster'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePriorityPowerSwitch'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRampLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowDispenser'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTradingPost'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkway'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkwayLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWall'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWallLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGCentralStorageContainer'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGChainsaw'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGChargedWeapon'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableEquipment'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentStunSpear'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentZipline'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGGasMask'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGGolfCartDispenser'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGHoverPack'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGJetPack'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGJumpingStilts'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGObjectScanner'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGParachute'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPoleDescriptor'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPortableMinerDispenser'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSuitBase'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGWeapon'": {
      return Effect.succeedNone;
    }

    default: {
      assert.fail(`Unknown native class: ${NativeClass}`);
    }
  }
}

/**
 * Make sure the native class list is of the correct shape.
 */
function parseVendorNativeClassListShape(
  nativeClassList: unknown,
): Effect.Effect<VendorDataShape, ParseError> {
  if (nativeClassList === null || typeof nativeClassList !== "object") {
    return Effect.fail(new ParseError("item must be an object"));
  }
  if (!("NativeClass" in nativeClassList)) {
    return Effect.fail(new ParseError("NativeClass must be defined"));
  }
  if (typeof nativeClassList.NativeClass !== "string") {
    return Effect.fail(new ParseError("NativeClass must be a string"));
  }
  if (!("Classes" in nativeClassList)) {
    return Effect.fail(new ParseError("Classes must be defined"));
  }
  if (!Array.isArray(nativeClassList.Classes)) {
    return Effect.fail(new ParseError("Classes must be an array"));
  }

  return Effect.succeed(
    nativeClassList as {
      NativeClass: string;
      Classes: unknown[];
    },
  );
}

function createNativeClassList<K extends VendorData["nativeClass"]>(
  nativeClass: K,
): (
  classes: Effect.Effect<VendorDataFor<K>["classes"], ParseError>,
) => Effect.Effect<VendorDataFor<K>, ParseError> {
  return (classesEffect) =>
    classesEffect.pipe(
      Effect.map(
        (classes) =>
          ({
            nativeClass,
            classes,
          }) as VendorDataFor<K>,
      ),
    );
}
