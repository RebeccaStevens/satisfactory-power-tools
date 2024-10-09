import { assert } from "chai";
import { Array, Effect, Option, pipe } from "effect";

import { parseFGAmmoTypeInstantHit } from "~/game-data/parsers/FGAmmoTypeInstantHit";
import { parseFGAmmoTypeProjectile } from "~/game-data/parsers/FGAmmoTypeProjectile";
import { parseFGAmmoTypeSpreadshot } from "~/game-data/parsers/FGAmmoTypeSpreadshot";
import { parseFGBuildable } from "~/game-data/parsers/FGBuildable";
import { parseFGBuildableAttachmentMerger } from "~/game-data/parsers/FGBuildableAttachmentMerger";
import { parseFGBuildableAttachmentSplitter } from "~/game-data/parsers/FGBuildableAttachmentSplitter";
import { parseFGBuildableBeamLightweight } from "~/game-data/parsers/FGBuildableBeamLightweight";
import { parseFGBuildableBlueprintDesigner } from "~/game-data/parsers/FGBuildableBlueprintDesigner";
import { parseFGBuildableCircuitSwitch } from "~/game-data/parsers/FGBuildableCircuitSwitch";
import { parseFGBuildableConveyorBelt } from "~/game-data/parsers/FGBuildableConveyorBelt";
import { parseFGBuildableConveyorLift } from "~/game-data/parsers/FGBuildableConveyorLift";
import { parseFGBuildableCornerWall } from "~/game-data/parsers/FGBuildableCornerWall";
import { parseFGBuildableCornerWallLightweight } from "~/game-data/parsers/FGBuildableCornerWallLightweight";
import { parseFGBuildableDockingStation } from "~/game-data/parsers/FGBuildableDockingStation";
import { parseFGBuildableDoor } from "~/game-data/parsers/FGBuildableDoor";
import { parseFGBuildableDroneStation } from "~/game-data/parsers/FGBuildableDroneStation";
import { parseFGBuildableFactory } from "~/game-data/parsers/FGBuildableFactory";
import { parseFGBuildableFactoryBuilding } from "~/game-data/parsers/FGBuildableFactoryBuilding";
import { parseFGBuildableFactorySimpleProducer } from "~/game-data/parsers/FGBuildableFactorySimpleProducer";
import { parseFGBuildableFloodlight } from "~/game-data/parsers/FGBuildableFloodlight";
import { parseFGBuildableFoundationLightweight } from "~/game-data/parsers/FGBuildableFoundationLightweight";
import { parseFGBuildableFrackingActivator } from "~/game-data/parsers/FGBuildableFrackingActivator";
import { parseFGBuildableFrackingExtractor } from "~/game-data/parsers/FGBuildableFrackingExtractor";
import { parseFGBuildableGeneratorFuel } from "~/game-data/parsers/FGBuildableGeneratorFuel";
import { parseFGBuildableGeneratorGeoThermal } from "~/game-data/parsers/FGBuildableGeneratorGeoThermal";
import { parseFGBuildableGeneratorNuclear } from "~/game-data/parsers/FGBuildableGeneratorNuclear";
import { parseFGBuildableJumppad } from "~/game-data/parsers/FGBuildableJumppad";
import { parseFGBuildableLadder } from "~/game-data/parsers/FGBuildableLadder";
import { parseFGBuildableLightSource } from "~/game-data/parsers/FGBuildableLightSource";
import { parseFGBuildableLightsControlPanel } from "~/game-data/parsers/FGBuildableLightsControlPanel";
import { parseFGBuildableMAM } from "~/game-data/parsers/FGBuildableMAM";
import { parseFGBuildableManufacturer } from "~/game-data/parsers/FGBuildableManufacturer";
import { parseFGBuildableManufacturerVariablePower } from "~/game-data/parsers/FGBuildableManufacturerVariablePower";
import { parseFGBuildablePassthrough } from "~/game-data/parsers/FGBuildablePassthrough";
import { parseFGBuildablePassthroughPipeHyper } from "~/game-data/parsers/FGBuildablePassthroughPipeHyper";
import { parseFGBuildablePillarLightweight } from "~/game-data/parsers/FGBuildablePillarLightweight";
import { parseFGBuildablePipeHyper } from "~/game-data/parsers/FGBuildablePipeHyper";
import { parseFGBuildablePipeReservoir } from "~/game-data/parsers/FGBuildablePipeReservoir";
import { parseFGBuildablePipeline } from "~/game-data/parsers/FGBuildablePipeline";
import { parseFGBuildablePipelineJunction } from "~/game-data/parsers/FGBuildablePipelineJunction";
import { parseFGBuildablePipelinePump } from "~/game-data/parsers/FGBuildablePipelinePump";
import { parseFGBuildablePipelineSupport } from "~/game-data/parsers/FGBuildablePipelineSupport";
import { parseFGBuildablePoleBase } from "~/game-data/parsers/FGBuildablePoleBase";
import { parseFGBuildablePoleLightweight } from "~/game-data/parsers/FGBuildablePoleLightweight";
import { parseFGBuildablePortal } from "~/game-data/parsers/FGBuildablePortal";
import { parseFGBuildablePortalSatellite } from "~/game-data/parsers/FGBuildablePortalSatellite";
import { parseFGBuildablePowerBooster } from "~/game-data/parsers/FGBuildablePowerBooster";
import { parseFGBuildablePowerPole } from "~/game-data/parsers/FGBuildablePowerPole";
import { parseFGBuildablePowerStorage } from "~/game-data/parsers/FGBuildablePowerStorage";
import { parseFGBuildablePriorityPowerSwitch } from "~/game-data/parsers/FGBuildablePriorityPowerSwitch";
import { parseFGBuildableRadarTower } from "~/game-data/parsers/FGBuildableRadarTower";
import { parseFGBuildableRailroadSignal } from "~/game-data/parsers/FGBuildableRailroadSignal";
import { parseFGBuildableRailroadStation } from "~/game-data/parsers/FGBuildableRailroadStation";
import { parseFGBuildableRailroadTrack } from "~/game-data/parsers/FGBuildableRailroadTrack";
import { parseFGBuildableRampLightweight } from "~/game-data/parsers/FGBuildableRampLightweight";
import { parseFGBuildableResourceExtractor } from "~/game-data/parsers/FGBuildableResourceExtractor";
import { parseFGBuildableResourceSink } from "~/game-data/parsers/FGBuildableResourceSink";
import { parseFGBuildableResourceSinkShop } from "~/game-data/parsers/FGBuildableResourceSinkShop";
import { parseFGBuildableSnowCannon } from "~/game-data/parsers/FGBuildableSnowCannon";
import { parseFGBuildableSnowDispenser } from "~/game-data/parsers/FGBuildableSnowDispenser";
import { parseFGBuildableSpaceElevator } from "~/game-data/parsers/FGBuildableSpaceElevator";
import { parseFGBuildableSplitterSmart } from "~/game-data/parsers/FGBuildableSplitterSmart";
import { parseFGBuildableStorage } from "~/game-data/parsers/FGBuildableStorage";
import { parseFGBuildableTradingPost } from "~/game-data/parsers/FGBuildableTradingPost";
import { parseFGBuildableTrainPlatformCargo } from "~/game-data/parsers/FGBuildableTrainPlatformCargo";
import { parseFGBuildableTrainPlatformEmpty } from "~/game-data/parsers/FGBuildableTrainPlatformEmpty";
import { parseFGBuildableWalkway } from "~/game-data/parsers/FGBuildableWalkway";
import { parseFGBuildableWalkwayLightweight } from "~/game-data/parsers/FGBuildableWalkwayLightweight";
import { parseFGBuildableWall } from "~/game-data/parsers/FGBuildableWall";
import { parseFGBuildableWallLightweight } from "~/game-data/parsers/FGBuildableWallLightweight";
import { parseFGBuildableWaterPump } from "~/game-data/parsers/FGBuildableWaterPump";
import { parseFGBuildableWidgetSign } from "~/game-data/parsers/FGBuildableWidgetSign";
import { parseFGBuildableWire } from "~/game-data/parsers/FGBuildableWire";
import { parseFGBuildingDescriptor } from "~/game-data/parsers/FGBuildingDescriptor";
import { parseFGCentralStorageContainer } from "~/game-data/parsers/FGCentralStorageContainer";
import { parseFGChainsaw } from "~/game-data/parsers/FGChainsaw";
import { parseFGChargedWeapon } from "~/game-data/parsers/FGChargedWeapon";
import { parseFGConsumableDescriptor } from "~/game-data/parsers/FGConsumableDescriptor";
import { parseFGConsumableEquipment } from "~/game-data/parsers/FGConsumableEquipment";
import { parseFGConveyorPoleStackable } from "~/game-data/parsers/FGConveyorPoleStackable";
import { parseFGCustomizationRecipe } from "~/game-data/parsers/FGCustomizationRecipe";
import { parseFGEquipmentDescriptor } from "~/game-data/parsers/FGEquipmentDescriptor";
import { parseFGEquipmentStunSpear } from "~/game-data/parsers/FGEquipmentStunSpear";
import { parseFGEquipmentZipline } from "~/game-data/parsers/FGEquipmentZipline";
import { parseFGGasMask } from "~/game-data/parsers/FGGasMask";
import { parseFGGolfCartDispenser } from "~/game-data/parsers/FGGolfCartDispenser";
import { parseFGHoverPack } from "~/game-data/parsers/FGHoverPack";
import { parseFGItemDescriptor } from "~/game-data/parsers/FGItemDescriptor";
import { parseFGItemDescriptorBiomass } from "~/game-data/parsers/FGItemDescriptorBiomass";
import { parseFGItemDescriptorNuclearFuel } from "~/game-data/parsers/FGItemDescriptorNuclearFuel";
import { parseFGItemDescriptorPowerBoosterFuel } from "~/game-data/parsers/FGItemDescriptorPowerBoosterFuel";
import { parseFGJetPack } from "~/game-data/parsers/FGJetPack";
import { parseFGJumpingStilts } from "~/game-data/parsers/FGJumpingStilts";
import { parseFGObjectScanner } from "~/game-data/parsers/FGObjectScanner";
import { parseFGParachute } from "~/game-data/parsers/FGParachute";
import { parseFGPipeHyperStart } from "~/game-data/parsers/FGPipeHyperStart";
import { parseFGPoleDescriptor } from "~/game-data/parsers/FGPoleDescriptor";
import { parseFGPortableMinerDispenser } from "~/game-data/parsers/FGPortableMinerDispenser";
import { parseFGPowerShardDescriptor } from "~/game-data/parsers/FGPowerShardDescriptor";
import { parseFGRecipe } from "~/game-data/parsers/FGRecipe";
import { parseFGResourceDescriptor } from "~/game-data/parsers/FGResourceDescriptor";
import { parseFGSchematic } from "~/game-data/parsers/FGSchematic";
import { parseFGSuitBase } from "~/game-data/parsers/FGSuitBase";
import { parseFGVehicleDescriptor } from "~/game-data/parsers/FGVehicleDescriptor";
import { parseFGWeapon } from "~/game-data/parsers/FGWeapon";
import { ParseError } from "~/game-data/parsers/errors";

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

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWallLightweight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableWallLightweight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableAttachmentMerger),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableAttachmentSplitter),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeamLightweight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableBeamLightweight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableBlueprintDesigner),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableCircuitSwitch),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableConveyorBelt),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableConveyorLift),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableCornerWall),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWallLightweight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableCornerWallLightweight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableDockingStation),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableDoor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableDroneStation),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableFloodlight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundationLightweight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableFoundationLightweight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableJumppad),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableLadder),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableLightsControlPanel),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableLightSource),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableMAM),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthrough'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePassthrough),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthroughPipeHyper'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePassthroughPipeHyper),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillarLightweight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePillarLightweight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePipeHyper),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePipeline),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePipelineJunction),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePipelinePump),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineSupport'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePipelineSupport),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePipeReservoir),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleBase'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePoleBase),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleLightweight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePoleLightweight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortal'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePortal),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortalSatellite'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePortalSatellite),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerBooster'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePowerBooster),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePowerPole),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePowerStorage),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePriorityPowerSwitch'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildablePriorityPowerSwitch),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableRadarTower),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableRailroadSignal),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableRailroadStation),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableRailroadTrack),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRampLightweight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableRampLightweight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableResourceSinkShop),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowCannon'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableSnowCannon),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowDispenser'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableSnowDispenser),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableSpaceElevator),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableSplitterSmart),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableStorage),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTradingPost'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableTradingPost),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableTrainPlatformCargo),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableTrainPlatformEmpty),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkway'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableWalkway),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkwayLightweight'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableWalkwayLightweight),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWall'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableWall),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableWaterPump),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableWidgetSign),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableWire),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGCentralStorageContainer'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGCentralStorageContainer),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGChainsaw'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGChainsaw),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGChargedWeapon'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGChargedWeapon),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableEquipment'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGConsumableEquipment),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGConveyorPoleStackable),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentStunSpear'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGEquipmentStunSpear),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentZipline'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGEquipmentZipline),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGGasMask'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGGasMask),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGGolfCartDispenser'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGGolfCartDispenser),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGHoverPack'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGHoverPack),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGJetPack'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGJetPack),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGJumpingStilts'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGJumpingStilts),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGObjectScanner'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGObjectScanner),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGParachute'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGParachute),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGPipeHyperStart),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPoleDescriptor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGPoleDescriptor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPortableMinerDispenser'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGPortableMinerDispenser),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGSchematic),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSuitBase'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGSuitBase),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGVehicleDescriptor),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGWeapon'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGWeapon),
        createNativeClassList(NativeClass),
        Effect.map(Option.some),
      );
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
