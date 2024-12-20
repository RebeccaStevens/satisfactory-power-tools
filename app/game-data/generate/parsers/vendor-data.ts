import { assert } from "chai";
import { Array, Effect, pipe } from "effect";

import { parseFGAmmoTypeInstantHit } from "~/game-data/generate/parsers/FGAmmoTypeInstantHit";
import { parseFGAmmoTypeProjectile } from "~/game-data/generate/parsers/FGAmmoTypeProjectile";
import { parseFGAmmoTypeSpreadshot } from "~/game-data/generate/parsers/FGAmmoTypeSpreadshot";
import { parseFGBuildable } from "~/game-data/generate/parsers/FGBuildable";
import { parseFGBuildableAttachmentMerger } from "~/game-data/generate/parsers/FGBuildableAttachmentMerger";
import { parseFGBuildableAttachmentSplitter } from "~/game-data/generate/parsers/FGBuildableAttachmentSplitter";
import { parseFGBuildableBeamLightweight } from "~/game-data/generate/parsers/FGBuildableBeamLightweight";
import { parseFGBuildableBlueprintDesigner } from "~/game-data/generate/parsers/FGBuildableBlueprintDesigner";
import { parseFGBuildableCircuitSwitch } from "~/game-data/generate/parsers/FGBuildableCircuitSwitch";
import { parseFGBuildableConveyorBelt } from "~/game-data/generate/parsers/FGBuildableConveyorBelt";
import { parseFGBuildableConveyorLift } from "~/game-data/generate/parsers/FGBuildableConveyorLift";
import { parseFGBuildableCornerWall } from "~/game-data/generate/parsers/FGBuildableCornerWall";
import { parseFGBuildableCornerWallLightweight } from "~/game-data/generate/parsers/FGBuildableCornerWallLightweight";
import { parseFGBuildableDockingStation } from "~/game-data/generate/parsers/FGBuildableDockingStation";
import { parseFGBuildableDoor } from "~/game-data/generate/parsers/FGBuildableDoor";
import { parseFGBuildableDroneStation } from "~/game-data/generate/parsers/FGBuildableDroneStation";
import { parseFGBuildableFactory } from "~/game-data/generate/parsers/FGBuildableFactory";
import { parseFGBuildableFactoryBuilding } from "~/game-data/generate/parsers/FGBuildableFactoryBuilding";
import { parseFGBuildableFactorySimpleProducer } from "~/game-data/generate/parsers/FGBuildableFactorySimpleProducer";
import { parseFGBuildableFloodlight } from "~/game-data/generate/parsers/FGBuildableFloodlight";
import { parseFGBuildableFoundationLightweight } from "~/game-data/generate/parsers/FGBuildableFoundationLightweight";
import { parseFGBuildableFrackingActivator } from "~/game-data/generate/parsers/FGBuildableFrackingActivator";
import { parseFGBuildableFrackingExtractor } from "~/game-data/generate/parsers/FGBuildableFrackingExtractor";
import { parseFGBuildableGeneratorFuel } from "~/game-data/generate/parsers/FGBuildableGeneratorFuel";
import { parseFGBuildableGeneratorGeoThermal } from "~/game-data/generate/parsers/FGBuildableGeneratorGeoThermal";
import { parseFGBuildableGeneratorNuclear } from "~/game-data/generate/parsers/FGBuildableGeneratorNuclear";
import { parseFGBuildableJumppad } from "~/game-data/generate/parsers/FGBuildableJumppad";
import { parseFGBuildableLadder } from "~/game-data/generate/parsers/FGBuildableLadder";
import { parseFGBuildableLightSource } from "~/game-data/generate/parsers/FGBuildableLightSource";
import { parseFGBuildableLightsControlPanel } from "~/game-data/generate/parsers/FGBuildableLightsControlPanel";
import { parseFGBuildableMAM } from "~/game-data/generate/parsers/FGBuildableMAM";
import { parseFGBuildableManufacturer } from "~/game-data/generate/parsers/FGBuildableManufacturer";
import { parseFGBuildableManufacturerVariablePower } from "~/game-data/generate/parsers/FGBuildableManufacturerVariablePower";
import { parseFGBuildablePassthrough } from "~/game-data/generate/parsers/FGBuildablePassthrough";
import { parseFGBuildablePassthroughPipeHyper } from "~/game-data/generate/parsers/FGBuildablePassthroughPipeHyper";
import { parseFGBuildablePillarLightweight } from "~/game-data/generate/parsers/FGBuildablePillarLightweight";
import { parseFGBuildablePipeHyper } from "~/game-data/generate/parsers/FGBuildablePipeHyper";
import { parseFGBuildablePipeReservoir } from "~/game-data/generate/parsers/FGBuildablePipeReservoir";
import { parseFGBuildablePipeline } from "~/game-data/generate/parsers/FGBuildablePipeline";
import { parseFGBuildablePipelineJunction } from "~/game-data/generate/parsers/FGBuildablePipelineJunction";
import { parseFGBuildablePipelinePump } from "~/game-data/generate/parsers/FGBuildablePipelinePump";
import { parseFGBuildablePipelineSupport } from "~/game-data/generate/parsers/FGBuildablePipelineSupport";
import { parseFGBuildablePoleBase } from "~/game-data/generate/parsers/FGBuildablePoleBase";
import { parseFGBuildablePoleLightweight } from "~/game-data/generate/parsers/FGBuildablePoleLightweight";
import { parseFGBuildablePortal } from "~/game-data/generate/parsers/FGBuildablePortal";
import { parseFGBuildablePortalSatellite } from "~/game-data/generate/parsers/FGBuildablePortalSatellite";
import { parseFGBuildablePowerBooster } from "~/game-data/generate/parsers/FGBuildablePowerBooster";
import { parseFGBuildablePowerPole } from "~/game-data/generate/parsers/FGBuildablePowerPole";
import { parseFGBuildablePowerStorage } from "~/game-data/generate/parsers/FGBuildablePowerStorage";
import { parseFGBuildablePriorityPowerSwitch } from "~/game-data/generate/parsers/FGBuildablePriorityPowerSwitch";
import { parseFGBuildableRadarTower } from "~/game-data/generate/parsers/FGBuildableRadarTower";
import { parseFGBuildableRailroadSignal } from "~/game-data/generate/parsers/FGBuildableRailroadSignal";
import { parseFGBuildableRailroadStation } from "~/game-data/generate/parsers/FGBuildableRailroadStation";
import { parseFGBuildableRailroadTrack } from "~/game-data/generate/parsers/FGBuildableRailroadTrack";
import { parseFGBuildableRampLightweight } from "~/game-data/generate/parsers/FGBuildableRampLightweight";
import { parseFGBuildableResourceExtractor } from "~/game-data/generate/parsers/FGBuildableResourceExtractor";
import { parseFGBuildableResourceSink } from "~/game-data/generate/parsers/FGBuildableResourceSink";
import { parseFGBuildableResourceSinkShop } from "~/game-data/generate/parsers/FGBuildableResourceSinkShop";
import { parseFGBuildableSnowCannon } from "~/game-data/generate/parsers/FGBuildableSnowCannon";
import { parseFGBuildableSnowDispenser } from "~/game-data/generate/parsers/FGBuildableSnowDispenser";
import { parseFGBuildableSpaceElevator } from "~/game-data/generate/parsers/FGBuildableSpaceElevator";
import { parseFGBuildableSplitterSmart } from "~/game-data/generate/parsers/FGBuildableSplitterSmart";
import { parseFGBuildableStorage } from "~/game-data/generate/parsers/FGBuildableStorage";
import { parseFGBuildableTradingPost } from "~/game-data/generate/parsers/FGBuildableTradingPost";
import { parseFGBuildableTrainPlatformCargo } from "~/game-data/generate/parsers/FGBuildableTrainPlatformCargo";
import { parseFGBuildableTrainPlatformEmpty } from "~/game-data/generate/parsers/FGBuildableTrainPlatformEmpty";
import { parseFGBuildableWalkway } from "~/game-data/generate/parsers/FGBuildableWalkway";
import { parseFGBuildableWalkwayLightweight } from "~/game-data/generate/parsers/FGBuildableWalkwayLightweight";
import { parseFGBuildableWall } from "~/game-data/generate/parsers/FGBuildableWall";
import { parseFGBuildableWallLightweight } from "~/game-data/generate/parsers/FGBuildableWallLightweight";
import { parseFGBuildableWaterPump } from "~/game-data/generate/parsers/FGBuildableWaterPump";
import { parseFGBuildableWidgetSign } from "~/game-data/generate/parsers/FGBuildableWidgetSign";
import { parseFGBuildableWire } from "~/game-data/generate/parsers/FGBuildableWire";
import { parseFGBuildingDescriptor } from "~/game-data/generate/parsers/FGBuildingDescriptor";
import { parseFGCentralStorageContainer } from "~/game-data/generate/parsers/FGCentralStorageContainer";
import { parseFGChainsaw } from "~/game-data/generate/parsers/FGChainsaw";
import { parseFGChargedWeapon } from "~/game-data/generate/parsers/FGChargedWeapon";
import { parseFGConsumableDescriptor } from "~/game-data/generate/parsers/FGConsumableDescriptor";
import { parseFGConsumableEquipment } from "~/game-data/generate/parsers/FGConsumableEquipment";
import { parseFGConveyorPoleStackable } from "~/game-data/generate/parsers/FGConveyorPoleStackable";
import { parseFGCustomizationRecipe } from "~/game-data/generate/parsers/FGCustomizationRecipe";
import { parseFGEquipmentDescriptor } from "~/game-data/generate/parsers/FGEquipmentDescriptor";
import { parseFGEquipmentStunSpear } from "~/game-data/generate/parsers/FGEquipmentStunSpear";
import { parseFGEquipmentZipline } from "~/game-data/generate/parsers/FGEquipmentZipline";
import { parseFGGasMask } from "~/game-data/generate/parsers/FGGasMask";
import { parseFGGolfCartDispenser } from "~/game-data/generate/parsers/FGGolfCartDispenser";
import { parseFGHoverPack } from "~/game-data/generate/parsers/FGHoverPack";
import { parseFGItemDescriptor } from "~/game-data/generate/parsers/FGItemDescriptor";
import { parseFGItemDescriptorBiomass } from "~/game-data/generate/parsers/FGItemDescriptorBiomass";
import { parseFGItemDescriptorNuclearFuel } from "~/game-data/generate/parsers/FGItemDescriptorNuclearFuel";
import { parseFGItemDescriptorPowerBoosterFuel } from "~/game-data/generate/parsers/FGItemDescriptorPowerBoosterFuel";
import { parseFGJetPack } from "~/game-data/generate/parsers/FGJetPack";
import { parseFGJumpingStilts } from "~/game-data/generate/parsers/FGJumpingStilts";
import { parseFGObjectScanner } from "~/game-data/generate/parsers/FGObjectScanner";
import { parseFGParachute } from "~/game-data/generate/parsers/FGParachute";
import { parseFGPipeHyperStart } from "~/game-data/generate/parsers/FGPipeHyperStart";
import { parseFGPoleDescriptor } from "~/game-data/generate/parsers/FGPoleDescriptor";
import { parseFGPortableMinerDispenser } from "~/game-data/generate/parsers/FGPortableMinerDispenser";
import { parseFGPowerShardDescriptor } from "~/game-data/generate/parsers/FGPowerShardDescriptor";
import { parseFGRecipe } from "~/game-data/generate/parsers/FGRecipe";
import { parseFGResourceDescriptor } from "~/game-data/generate/parsers/FGResourceDescriptor";
import { parseFGSchematic } from "~/game-data/generate/parsers/FGSchematic";
import { parseFGSuitBase } from "~/game-data/generate/parsers/FGSuitBase";
import { parseFGVehicleDescriptor } from "~/game-data/generate/parsers/FGVehicleDescriptor";
import { parseFGWeapon } from "~/game-data/generate/parsers/FGWeapon";
import { ParseError } from "~/game-data/generate/parsers/errors";

import type { VendorData, VendorDataFor } from "./types";

/**
 * Parse the vendor data.
 */
export function parseVendorData(vendorData: unknown[]): Effect.Effect<VendorData[], ParseError> {
  return pipe(
    vendorData,
    Effect.forEach(ensureVendorNativeClassListShape),
    Effect.flatMap(Effect.forEach(parseNativeClassList)),
  );
}

/**
 * Parse a native class list.
 */
function parseNativeClassList({
  NativeClass,
  Classes,
}: {
  NativeClass: string;
  Classes: unknown[];
}): Effect.Effect<VendorData, ParseError> {
  switch (NativeClass) {
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'": {
      return pipe(Classes, Effect.forEach(parseFGBuildingDescriptor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'": {
      return pipe(Classes, Effect.forEach(parseFGItemDescriptor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'": {
      return pipe(Classes, Effect.forEach(parseFGItemDescriptorBiomass), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'": {
      return pipe(Classes, Effect.forEach(parseFGItemDescriptorNuclearFuel), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorPowerBoosterFuel'": {
      return pipe(Classes, Effect.forEach(parseFGItemDescriptorPowerBoosterFuel), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'": {
      return pipe(Classes, Effect.forEach(parseFGResourceDescriptor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'": {
      return pipe(Classes, Effect.forEach(parseFGConsumableDescriptor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'": {
      return pipe(Classes, Effect.forEach(parseFGEquipmentDescriptor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPowerShardDescriptor'": {
      return pipe(Classes, Effect.forEach(parseFGPowerShardDescriptor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'": {
      return pipe(Classes, Effect.forEach(parseFGRecipe), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGCustomizationRecipe'": {
      return pipe(Classes, Effect.forEach(parseFGCustomizationRecipe), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'": {
      return pipe(Classes, Effect.forEach(parseFGAmmoTypeInstantHit), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'": {
      return pipe(Classes, Effect.forEach(parseFGAmmoTypeProjectile), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'": {
      return pipe(Classes, Effect.forEach(parseFGAmmoTypeSpreadshot), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'": {
      return pipe(Classes, Effect.forEach(parseFGBuildable), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableFactory), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactoryBuilding'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableFactoryBuilding), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableFactorySimpleProducer), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableManufacturer), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'": {
      return pipe(
        Classes,
        Effect.forEach(parseFGBuildableManufacturerVariablePower),
        createNativeClassList(NativeClass),
      );
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableGeneratorFuel), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableGeneratorGeoThermal), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableGeneratorNuclear), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableFrackingActivator), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableFrackingExtractor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableResourceExtractor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableResourceSink), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWallLightweight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableWallLightweight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableAttachmentMerger), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableAttachmentSplitter), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeamLightweight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableBeamLightweight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableBlueprintDesigner), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableCircuitSwitch), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableConveyorBelt), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableConveyorLift), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableCornerWall), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWallLightweight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableCornerWallLightweight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableDockingStation), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableDoor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableDroneStation), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableFloodlight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundationLightweight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableFoundationLightweight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableJumppad), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableLadder), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableLightsControlPanel), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableLightSource), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableMAM), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthrough'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePassthrough), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthroughPipeHyper'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePassthroughPipeHyper), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillarLightweight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePillarLightweight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePipeHyper), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePipeline), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePipelineJunction), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePipelinePump), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineSupport'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePipelineSupport), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePipeReservoir), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleBase'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePoleBase), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleLightweight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePoleLightweight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortal'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePortal), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortalSatellite'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePortalSatellite), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerBooster'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePowerBooster), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePowerPole), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePowerStorage), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePriorityPowerSwitch'": {
      return pipe(Classes, Effect.forEach(parseFGBuildablePriorityPowerSwitch), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableRadarTower), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableRailroadSignal), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableRailroadStation), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableRailroadTrack), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRampLightweight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableRampLightweight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableResourceSinkShop), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowCannon'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableSnowCannon), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowDispenser'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableSnowDispenser), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableSpaceElevator), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableSplitterSmart), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableStorage), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTradingPost'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableTradingPost), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableTrainPlatformCargo), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableTrainPlatformEmpty), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkway'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableWalkway), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkwayLightweight'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableWalkwayLightweight), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWall'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableWall), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableWaterPump), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableWidgetSign), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'": {
      return pipe(Classes, Effect.forEach(parseFGBuildableWire), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGCentralStorageContainer'": {
      return pipe(Classes, Effect.forEach(parseFGCentralStorageContainer), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGChainsaw'": {
      return pipe(Classes, Effect.forEach(parseFGChainsaw), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGChargedWeapon'": {
      return pipe(Classes, Effect.forEach(parseFGChargedWeapon), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableEquipment'": {
      return pipe(Classes, Effect.forEach(parseFGConsumableEquipment), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'": {
      return pipe(Classes, Effect.forEach(parseFGConveyorPoleStackable), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentStunSpear'": {
      return pipe(Classes, Effect.forEach(parseFGEquipmentStunSpear), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentZipline'": {
      return pipe(Classes, Effect.forEach(parseFGEquipmentZipline), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGGasMask'": {
      return pipe(Classes, Effect.forEach(parseFGGasMask), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGGolfCartDispenser'": {
      return pipe(Classes, Effect.forEach(parseFGGolfCartDispenser), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGHoverPack'": {
      return pipe(Classes, Effect.forEach(parseFGHoverPack), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGJetPack'": {
      return pipe(Classes, Effect.forEach(parseFGJetPack), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGJumpingStilts'": {
      return pipe(Classes, Effect.forEach(parseFGJumpingStilts), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGObjectScanner'": {
      return pipe(Classes, Effect.forEach(parseFGObjectScanner), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGParachute'": {
      return pipe(Classes, Effect.forEach(parseFGParachute), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'": {
      return pipe(Classes, Effect.forEach(parseFGPipeHyperStart), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPoleDescriptor'": {
      return pipe(Classes, Effect.forEach(parseFGPoleDescriptor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPortableMinerDispenser'": {
      return pipe(Classes, Effect.forEach(parseFGPortableMinerDispenser), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'": {
      return pipe(Classes, Effect.forEach(parseFGSchematic), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSuitBase'": {
      return pipe(Classes, Effect.forEach(parseFGSuitBase), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'": {
      return pipe(Classes, Effect.forEach(parseFGVehicleDescriptor), createNativeClassList(NativeClass));
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGWeapon'": {
      return pipe(Classes, Effect.forEach(parseFGWeapon), createNativeClassList(NativeClass));
    }

    default: {
      assert.fail(`Unknown native class: ${NativeClass}`);
    }
  }
}

/**
 * Make sure the native class list is of the correct shape.
 */
function ensureVendorNativeClassListShape(nativeClassList: unknown): Effect.Effect<
  {
    NativeClass: string;
    Classes: unknown[];
  },
  ParseError
> {
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
): (classes: Effect.Effect<VendorDataFor<K>["classes"], ParseError>) => Effect.Effect<VendorDataFor<K>, ParseError> {
  return (classesEffect) =>
    pipe(
      classesEffect,
      Effect.map(
        (classes) =>
          ({
            nativeClass,
            classes,
          }) as VendorDataFor<K>,
      ),
    );
}
