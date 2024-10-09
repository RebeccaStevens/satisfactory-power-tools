import type { FGAmmoTypeInstantHit } from "~/game-data/parsers/FGAmmoTypeInstantHit";
import type { FGAmmoTypeProjectile } from "~/game-data/parsers/FGAmmoTypeProjectile";
import type { FGAmmoTypeSpreadshot } from "~/game-data/parsers/FGAmmoTypeSpreadshot";
import type { FGBuildable } from "~/game-data/parsers/FGBuildable";
import type { FGBuildableAttachmentMerger } from "~/game-data/parsers/FGBuildableAttachmentMerger";
import type { FGBuildableAttachmentSplitter } from "~/game-data/parsers/FGBuildableAttachmentSplitter";
import type { FGBuildableBeamLightweight } from "~/game-data/parsers/FGBuildableBeamLightweight";
import type { FGBuildableBlueprintDesigner } from "~/game-data/parsers/FGBuildableBlueprintDesigner";
import type { FGBuildableCircuitSwitch } from "~/game-data/parsers/FGBuildableCircuitSwitch";
import type { FGBuildableConveyorBelt } from "~/game-data/parsers/FGBuildableConveyorBelt";
import type { FGBuildableConveyorLift } from "~/game-data/parsers/FGBuildableConveyorLift";
import type { FGBuildableCornerWall } from "~/game-data/parsers/FGBuildableCornerWall";
import type { FGBuildableCornerWallLightweight } from "~/game-data/parsers/FGBuildableCornerWallLightweight";
import type { FGBuildableDockingStation } from "~/game-data/parsers/FGBuildableDockingStation";
import type { FGBuildableDoor } from "~/game-data/parsers/FGBuildableDoor";
import type { FGBuildableDroneStation } from "~/game-data/parsers/FGBuildableDroneStation";
import type { FGBuildableFactory } from "~/game-data/parsers/FGBuildableFactory";
import type { FGBuildableFactoryBuilding } from "~/game-data/parsers/FGBuildableFactoryBuilding";
import type { FGBuildableFactorySimpleProducer } from "~/game-data/parsers/FGBuildableFactorySimpleProducer";
import type { FGBuildableFloodlight } from "~/game-data/parsers/FGBuildableFloodlight";
import type { FGBuildableFoundationLightweight } from "~/game-data/parsers/FGBuildableFoundationLightweight";
import type { FGBuildableFrackingActivator } from "~/game-data/parsers/FGBuildableFrackingActivator";
import type { FGBuildableFrackingExtractor } from "~/game-data/parsers/FGBuildableFrackingExtractor";
import type { FGBuildableGeneratorFuel } from "~/game-data/parsers/FGBuildableGeneratorFuel";
import type { FGBuildableGeneratorGeoThermal } from "~/game-data/parsers/FGBuildableGeneratorGeoThermal";
import type { FGBuildableGeneratorNuclear } from "~/game-data/parsers/FGBuildableGeneratorNuclear";
import type { FGBuildableJumppad } from "~/game-data/parsers/FGBuildableJumppad";
import type { FGBuildableLadder } from "~/game-data/parsers/FGBuildableLadder";
import type { FGBuildableLightSource } from "~/game-data/parsers/FGBuildableLightSource";
import type { FGBuildableLightsControlPanel } from "~/game-data/parsers/FGBuildableLightsControlPanel";
import type { FGBuildableMAM } from "~/game-data/parsers/FGBuildableMAM";
import type { FGBuildableManufacturer } from "~/game-data/parsers/FGBuildableManufacturer";
import type { FGBuildableManufacturerVariablePower } from "~/game-data/parsers/FGBuildableManufacturerVariablePower";
import type { FGBuildablePassthrough } from "~/game-data/parsers/FGBuildablePassthrough";
import type { FGBuildablePassthroughPipeHyper } from "~/game-data/parsers/FGBuildablePassthroughPipeHyper";
import type { FGBuildablePillarLightweight } from "~/game-data/parsers/FGBuildablePillarLightweight";
import type { FGBuildablePipeHyper } from "~/game-data/parsers/FGBuildablePipeHyper";
import type { FGBuildablePipeReservoir } from "~/game-data/parsers/FGBuildablePipeReservoir";
import type { FGBuildablePipeline } from "~/game-data/parsers/FGBuildablePipeline";
import type { FGBuildablePipelineJunction } from "~/game-data/parsers/FGBuildablePipelineJunction";
import type { FGBuildablePipelinePump } from "~/game-data/parsers/FGBuildablePipelinePump";
import type { FGBuildablePipelineSupport } from "~/game-data/parsers/FGBuildablePipelineSupport";
import type { FGBuildablePoleBase } from "~/game-data/parsers/FGBuildablePoleBase";
import type { FGBuildablePoleLightweight } from "~/game-data/parsers/FGBuildablePoleLightweight";
import type { FGBuildablePortal } from "~/game-data/parsers/FGBuildablePortal";
import type { FGBuildablePortalSatellite } from "~/game-data/parsers/FGBuildablePortalSatellite";
import type { FGBuildablePowerBooster } from "~/game-data/parsers/FGBuildablePowerBooster";
import type { FGBuildablePowerPole } from "~/game-data/parsers/FGBuildablePowerPole";
import type { FGBuildablePowerStorage } from "~/game-data/parsers/FGBuildablePowerStorage";
import type { FGBuildablePriorityPowerSwitch } from "~/game-data/parsers/FGBuildablePriorityPowerSwitch";
import type { FGBuildableRadarTower } from "~/game-data/parsers/FGBuildableRadarTower";
import type { FGBuildableRailroadSignal } from "~/game-data/parsers/FGBuildableRailroadSignal";
import type { FGBuildableRailroadStation } from "~/game-data/parsers/FGBuildableRailroadStation";
import type { FGBuildableRailroadTrack } from "~/game-data/parsers/FGBuildableRailroadTrack";
import type { FGBuildableRampLightweight } from "~/game-data/parsers/FGBuildableRampLightweight";
import type { FGBuildableResourceExtractor } from "~/game-data/parsers/FGBuildableResourceExtractor";
import type { FGBuildableResourceSink } from "~/game-data/parsers/FGBuildableResourceSink";
import type { FGBuildableResourceSinkShop } from "~/game-data/parsers/FGBuildableResourceSinkShop";
import type { FGBuildableSnowCannon } from "~/game-data/parsers/FGBuildableSnowCannon";
import type { FGBuildableSnowDispenser } from "~/game-data/parsers/FGBuildableSnowDispenser";
import type { FGBuildableSpaceElevator } from "~/game-data/parsers/FGBuildableSpaceElevator";
import type { FGBuildableSplitterSmart } from "~/game-data/parsers/FGBuildableSplitterSmart";
import type { FGBuildableStorage } from "~/game-data/parsers/FGBuildableStorage";
import type { FGBuildableTradingPost } from "~/game-data/parsers/FGBuildableTradingPost";
import type { FGBuildableTrainPlatformCargo } from "~/game-data/parsers/FGBuildableTrainPlatformCargo";
import type { FGBuildableTrainPlatformEmpty } from "~/game-data/parsers/FGBuildableTrainPlatformEmpty";
import type { FGBuildableWalkway } from "~/game-data/parsers/FGBuildableWalkway";
import type { FGBuildableWalkwayLightweight } from "~/game-data/parsers/FGBuildableWalkwayLightweight";
import type { FGBuildableWall } from "~/game-data/parsers/FGBuildableWall";
import type { FGBuildableWallLightweight } from "~/game-data/parsers/FGBuildableWallLightweight";
import type { FGBuildableWaterPump } from "~/game-data/parsers/FGBuildableWaterPump";
import type { FGBuildableWidgetSign } from "~/game-data/parsers/FGBuildableWidgetSign";
import type { FGBuildableWire } from "~/game-data/parsers/FGBuildableWire";
import type { FGBuildingDescriptor } from "~/game-data/parsers/FGBuildingDescriptor";
import type { FGCentralStorageContainer } from "~/game-data/parsers/FGCentralStorageContainer";
import type { FGChainsaw } from "~/game-data/parsers/FGChainsaw";
import type { FGChargedWeapon } from "~/game-data/parsers/FGChargedWeapon";
import type { FGConsumableDescriptor } from "~/game-data/parsers/FGConsumableDescriptor";
import type { FGConsumableEquipment } from "~/game-data/parsers/FGConsumableEquipment";
import type { FGConveyorPoleStackable } from "~/game-data/parsers/FGConveyorPoleStackable";
import type { FGCustomizationRecipe } from "~/game-data/parsers/FGCustomizationRecipe";
import type { FGEquipmentDescriptor } from "~/game-data/parsers/FGEquipmentDescriptor";
import type { FGEquipmentStunSpear } from "~/game-data/parsers/FGEquipmentStunSpear";
import type { FGEquipmentZipline } from "~/game-data/parsers/FGEquipmentZipline";
import type { FGGasMask } from "~/game-data/parsers/FGGasMask";
import type { FGGolfCartDispenser } from "~/game-data/parsers/FGGolfCartDispenser";
import type { FGHoverPack } from "~/game-data/parsers/FGHoverPack";
import type { FGItemDescriptor } from "~/game-data/parsers/FGItemDescriptor";
import type { FGItemDescriptorBiomass } from "~/game-data/parsers/FGItemDescriptorBiomass";
import type { FGItemDescriptorNuclearFuel } from "~/game-data/parsers/FGItemDescriptorNuclearFuel";
import type { FGItemDescriptorPowerBoosterFuel } from "~/game-data/parsers/FGItemDescriptorPowerBoosterFuel";
import type { FGJetPack } from "~/game-data/parsers/FGJetPack";
import type { FGJumpingStilts } from "~/game-data/parsers/FGJumpingStilts";
import type { FGObjectScanner } from "~/game-data/parsers/FGObjectScanner";
import type { FGParachute } from "~/game-data/parsers/FGParachute";
import type { FGPipeHyperStart } from "~/game-data/parsers/FGPipeHyperStart";
import type { FGPoleDescriptor } from "~/game-data/parsers/FGPoleDescriptor";
import type { FGPortableMinerDispenser } from "~/game-data/parsers/FGPortableMinerDispenser";
import type { FGPowerShardDescriptor } from "~/game-data/parsers/FGPowerShardDescriptor";
import type { FGRecipe } from "~/game-data/parsers/FGRecipe";
import type { FGResourceDescriptor } from "~/game-data/parsers/FGResourceDescriptor";
import type { FGSchematic } from "~/game-data/parsers/FGSchematic";
import type { FGSuitBase } from "~/game-data/parsers/FGSuitBase";
import type { FGVehicleDescriptor } from "~/game-data/parsers/FGVehicleDescriptor";
import type { FGWeapon } from "~/game-data/parsers/FGWeapon";

export type VendorDataShape = {
  NativeClass: string;
  Classes: unknown[];
};

export type VendorData =
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'";
      classes: FGBuildingDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'";
      classes: FGItemDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'";
      classes: FGItemDescriptorBiomass[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'";
      classes: FGItemDescriptorNuclearFuel[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorPowerBoosterFuel'";
      classes: FGItemDescriptorPowerBoosterFuel[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'";
      classes: FGResourceDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'";
      classes: FGConsumableDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'";
      classes: FGEquipmentDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPowerShardDescriptor'";
      classes: FGPowerShardDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'";
      classes: FGAmmoTypeInstantHit[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'";
      classes: FGAmmoTypeProjectile[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'";
      classes: FGAmmoTypeSpreadshot[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'";
      classes: FGRecipe[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGCustomizationRecipe'";
      classes: FGCustomizationRecipe[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'";
      classes: FGBuildable[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'";
      classes: FGBuildableFactory[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactoryBuilding'";
      classes: FGBuildableFactoryBuilding[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'";
      classes: FGBuildableFactorySimpleProducer[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'";
      classes: FGBuildableManufacturer[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'";
      classes: FGBuildableManufacturerVariablePower[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'";
      classes: FGBuildableGeneratorFuel[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'";
      classes: FGBuildableGeneratorGeoThermal[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'";
      classes: FGBuildableGeneratorNuclear[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'";
      classes: FGBuildableFrackingActivator[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'";
      classes: FGBuildableFrackingExtractor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'";
      classes: FGBuildableResourceExtractor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'";
      classes: FGBuildableResourceSink[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWallLightweight'";
      classes: FGBuildableWallLightweight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'";
      classes: FGBuildableAttachmentMerger[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'";
      classes: FGBuildableAttachmentSplitter[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeamLightweight'";
      classes: FGBuildableBeamLightweight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'";
      classes: FGBuildableBlueprintDesigner[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'";
      classes: FGBuildableCircuitSwitch[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'";
      classes: FGBuildableConveyorBelt[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'";
      classes: FGBuildableConveyorLift[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'";
      classes: FGBuildableCornerWall[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWallLightweight'";
      classes: FGBuildableCornerWallLightweight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'";
      classes: FGBuildableDockingStation[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'";
      classes: FGBuildableDoor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'";
      classes: FGBuildableDroneStation[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'";
      classes: FGBuildableFloodlight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundationLightweight'";
      classes: FGBuildableFoundationLightweight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'";
      classes: FGBuildableJumppad[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'";
      classes: FGBuildableLadder[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'";
      classes: FGBuildableLightsControlPanel[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'";
      classes: FGBuildableLightSource[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'";
      classes: FGBuildableMAM[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthrough'";
      classes: FGBuildablePassthrough[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthroughPipeHyper'";
      classes: FGBuildablePassthroughPipeHyper[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillarLightweight'";
      classes: FGBuildablePillarLightweight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'";
      classes: FGBuildablePipeHyper[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'";
      classes: FGBuildablePipeline[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'";
      classes: FGBuildablePipelineJunction[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'";
      classes: FGBuildablePipelinePump[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineSupport'";
      classes: FGBuildablePipelineSupport[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'";
      classes: FGBuildablePipeReservoir[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleBase'";
      classes: FGBuildablePoleBase[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleLightweight'";
      classes: FGBuildablePoleLightweight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortal'";
      classes: FGBuildablePortal[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePortalSatellite'";
      classes: FGBuildablePortalSatellite[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerBooster'";
      classes: FGBuildablePowerBooster[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'";
      classes: FGBuildablePowerPole[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'";
      classes: FGBuildablePowerStorage[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePriorityPowerSwitch'";
      classes: FGBuildablePriorityPowerSwitch[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'";
      classes: FGBuildableRadarTower[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'";
      classes: FGBuildableRailroadSignal[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'";
      classes: FGBuildableRailroadStation[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'";
      classes: FGBuildableRailroadTrack[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRampLightweight'";
      classes: FGBuildableRampLightweight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'";
      classes: FGBuildableResourceSinkShop[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowDispenser'";
      classes: FGBuildableSnowDispenser[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'";
      classes: FGBuildableSpaceElevator[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'";
      classes: FGBuildableSplitterSmart[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'";
      classes: FGBuildableStorage[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTradingPost'";
      classes: FGBuildableTradingPost[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'";
      classes: FGBuildableTrainPlatformCargo[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'";
      classes: FGBuildableTrainPlatformEmpty[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkway'";
      classes: FGBuildableWalkway[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkwayLightweight'";
      classes: FGBuildableWalkwayLightweight[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWall'";
      classes: FGBuildableWall[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'";
      classes: FGBuildableWaterPump[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'";
      classes: FGBuildableWidgetSign[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'";
      classes: FGBuildableWire[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGCentralStorageContainer'";
      classes: FGCentralStorageContainer[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGChainsaw'";
      classes: FGChainsaw[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGChargedWeapon'";
      classes: FGChargedWeapon[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableEquipment'";
      classes: FGConsumableEquipment[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'";
      classes: FGConveyorPoleStackable[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentStunSpear'";
      classes: FGEquipmentStunSpear[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentZipline'";
      classes: FGEquipmentZipline[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGGasMask'";
      classes: FGGasMask[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGGolfCartDispenser'";
      classes: FGGolfCartDispenser[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGHoverPack'";
      classes: FGHoverPack[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGJetPack'";
      classes: FGJetPack[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGJumpingStilts'";
      classes: FGJumpingStilts[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGObjectScanner'";
      classes: FGObjectScanner[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGParachute'";
      classes: FGParachute[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'";
      classes: FGPipeHyperStart[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPoleDescriptor'";
      classes: FGPoleDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPortableMinerDispenser'";
      classes: FGPortableMinerDispenser[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'";
      classes: FGSchematic[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGSuitBase'";
      classes: FGSuitBase[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'";
      classes: FGVehicleDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGWeapon'";
      classes: FGWeapon[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowCannon'";
      classes: FGBuildableSnowCannon[];
    };

export type VendorDataFor<K extends VendorData["nativeClass"]> = VendorData & {
  nativeClass: K;
};
