import assert from "node:assert/strict";

import docsJsonData from "~/data/raw/docs.json" assert { type: "json" };
import { isObject, assertNever } from "~/utils";

import {
  parseAmmoTypeProjectile,
  parseAmmoTypeSpreadshot,
  parseBaseItem,
  parseBlueprintDesigner,
  parseBuildable,
  parseBuildableAttachmentMerger,
  parseBuildableAttachmentSplitter,
  parseBuildableBeamLightweight,
  parseBuildableBuilding,
  parseBuildableConveyorBelt,
  parseBuildableConveyorLift,
  parseBuildableCornerWall,
  parseBuildableDockingStation,
  parseBuildableDoor,
  parseBuildableFoundation,
  parseBuildableFrackingActivator,
  parseBuildableFrackingExtractor,
  parseBuildableGeneratorFuel,
  parseBuildableGeneratorNuclear,
  parseBuildableJumppad,
  parseBuildableMAM,
  parseBuildableManufacturer,
  parseBuildableManufacturerVariablePower,
  parseBuildablePillarLightweight,
  parseBuildablePipeHyper,
  parseBuildablePipeline,
  parseBuildablePipelineJunction,
  parseBuildablePipelineSupport,
  parseBuildablePoleLightweight,
  parseBuildablePowerPole,
  parseBuildableRamp,
  parseBuildableResourceExtractor,
  parseBuildableResourceSink,
  parseBuildableResourceSinkShop,
  parseBuildableSplitterSmart,
  parseBuildableStorage,
  parseBuildableTradingPost,
  parseBuildableWalkwayLightweight,
  parseBuildableWall,
  parseBuildableWaterPump,
  parseBuildableWire,
  parseChainsaw,
  parseChargedWeapon,
  parseConsumableDescriptor,
  parseConsumableEquipment,
  parseDroneStation,
  parseEquipmentStunSpear,
  parseGasMask,
  parseGolfCartDispenser,
  parseItem,
  parseJetPack,
  parseJumpingStilts,
  parsePipeHyperStart,
  parsePortableMinerDispenser,
  parseRecipe,
  parseResource,
  parseSchematic,
  parseSuitBase,
  parseVehicleDescriptor,
  parseWeapon,
  parseBuildablePowerStorage,
  parseBuildableRailroadSignal,
  parseBuildableTrainPlatformCargo,
  parseBuildableTrainPlatformEmpty,
  parseBuildableRailroadStation,
  parseBuildableRailroadTrack,
  parseHoverPack,
  parseEquipmentZipline,
  parseBuildableCircuitSwitch,
  parseBuildableGeneratorGeoThermal,
  parseParachute,
  parseBuildableRadarTower,
  parseBuildableFactorySimpleProducer,
  parseBuildableWidgetSign,
  parseBuildableLightSource,
  parseBuildableLadder,
  parseBuildableStair,
  parseBuildableFloodlight,
  parseBuildableLightsControlPanel,
  parseBuildablePassthrough,
  parseItemDescriptorNuclearFuel,
  parseAmmoTypeInstantHit,
  parseObjectScanner,
  parseBuildablePipelinePump,
  parseBuildablePipeReservoir,
} from "./parsers";

/**
 * Group the raw data class data by their native class name.
 */
function rawGameDataByNativeClass() {
  return new Map(
    docsJsonData.map((group): [string, ReadonlyArray<unknown>] => {
      assert(
        isObject(group) &&
          Object.hasOwn(group, "NativeClass") &&
          typeof group.NativeClass === "string" &&
          Object.hasOwn(group, "Classes") &&
          Array.isArray(group.Classes),
      );
      return [group.NativeClass, group.Classes];
    }),
  );
}

function parseRawGameData(data: ReadonlyMap<string, ReadonlyArray<unknown>>) {
  return data.entries().map(([className, d]) => {
    const parser = getClassParser(className);
    return d.map((i) => {
      const p = parser(i);
      return [p.ClassName, p];
    });
  });
}

function getClassParser(className: string) {
  switch (className) {
    case "Class'/Script/FactoryGame.FGBuildingDescriptor'":
    case "Class'/Script/FactoryGame.FGPoleDescriptor'": {
      return parseBaseItem;
    }

    case "Class'/Script/FactoryGame.FGItemDescriptor'":
    case "Class'/Script/FactoryGame.FGItemDescriptorBiomass'":
    case "Class'/Script/FactoryGame.FGEquipmentDescriptor'": {
      return parseItem;
    }

    case "Class'/Script/FactoryGame.FGResourceDescriptor'": {
      return parseResource;
    }

    case "Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'": {
      return parseBlueprintDesigner;
    }

    case "Class'/Script/FactoryGame.FGBuildableDroneStation'": {
      return parseDroneStation;
    }

    case "Class'/Script/FactoryGame.FGConsumableEquipment'": {
      return parseConsumableEquipment;
    }

    case "Class'/Script/FactoryGame.FGSchematic'": {
      return parseSchematic;
    }

    case "Class'/Script/FactoryGame.FGConsumableDescriptor'": {
      return parseConsumableDescriptor;
    }

    case "Class'/Script/FactoryGame.FGBuildable'":
    case "Class'/Script/FactoryGame.FGBuildableSnowDispenser'":
    case "Class'/Script/FactoryGame.FGBuildableFactoryBuilding'": {
      return parseBuildable;
    }

    case "Class'/Script/FactoryGame.FGBuildableWall'":
    case "Class'/Script/FactoryGame.FGBuildableWallLightweight'": {
      return parseBuildableWall;
    }

    case "Class'/Script/FactoryGame.FGBuildableCornerWall'": {
      return parseBuildableCornerWall;
    }

    case "Class'/Script/FactoryGame.FGBuildableDoor'": {
      return parseBuildableDoor;
    }

    case "Class'/Script/FactoryGame.FGRecipe'":
    case "Class'/Script/FactoryGame.FGCustomizationRecipe'": {
      return parseRecipe;
    }

    case "Class'/Script/FactoryGame.FGBuildableFrackingExtractor'": {
      return parseBuildableFrackingExtractor;
    }

    case "Class'/Script/FactoryGame.FGBuildableFrackingActivator'": {
      return parseBuildableFrackingActivator;
    }

    case "Class'/Script/FactoryGame.FGBuildableResourceExtractor'": {
      return parseBuildableResourceExtractor;
    }

    case "Class'/Script/FactoryGame.FGBuildableSpaceElevator'":
    case "Class'/Script/FactoryGame.FGBuildableFactory'": {
      return parseBuildableBuilding;
    }

    case "Class'/Script/FactoryGame.FGBuildableTradingPost'": {
      return parseBuildableTradingPost;
    }

    case "Class'/Script/FactoryGame.FGBuildablePoleLightweight'":
    case "Class'/Script/FactoryGame.FGConveyorPoleStackable'": {
      return parseBuildablePoleLightweight;
    }

    case "Class'/Script/FactoryGame.FGBuildableConveyorBelt'": {
      return parseBuildableConveyorBelt;
    }

    case "Class'/Script/FactoryGame.FGBuildableWire'": {
      return parseBuildableWire;
    }

    case "Class'/Script/FactoryGame.FGBuildablePowerPole'": {
      return parseBuildablePowerPole;
    }

    case "Class'/Script/FactoryGame.FGChainsaw'": {
      return parseChainsaw;
    }

    case "Class'/Script/FactoryGame.FGGolfCartDispenser'": {
      return parseGolfCartDispenser;
    }

    case "Class'/Script/FactoryGame.FGSuitBase'": {
      return parseSuitBase;
    }

    case "Class'/Script/FactoryGame.FGJetPack'": {
      return parseJetPack;
    }

    case "Class'/Script/FactoryGame.FGJumpingStilts'": {
      return parseJumpingStilts;
    }

    case "Class'/Script/FactoryGame.FGAmmoTypeProjectile'": {
      return parseAmmoTypeProjectile;
    }

    case "Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'": {
      return parseAmmoTypeSpreadshot;
    }

    case "Class'/Script/FactoryGame.FGWeapon'": {
      return parseWeapon;
    }

    case "Class'/Script/FactoryGame.FGChargedWeapon'": {
      return parseChargedWeapon;
    }

    case "Class'/Script/FactoryGame.FGEquipmentStunSpear'": {
      return parseEquipmentStunSpear;
    }

    case "Class'/Script/FactoryGame.FGGasMask'": {
      return parseGasMask;
    }

    case "Class'/Script/FactoryGame.FGBuildableWaterPump'": {
      return parseBuildableWaterPump;
    }

    case "Class'/Script/FactoryGame.FGBuildableManufacturer'": {
      return parseBuildableManufacturer;
    }

    case "Class'/Script/FactoryGame.FGPortableMinerDispenser'": {
      return parsePortableMinerDispenser;
    }

    case "Class'/Script/FactoryGame.FGBuildableStorage'": {
      return parseBuildableStorage;
    }

    case "Class'/Script/FactoryGame.FGBuildableGeneratorFuel'": {
      return parseBuildableGeneratorFuel;
    }

    case "Class'/Script/FactoryGame.FGBuildableMAM'": {
      return parseBuildableMAM;
    }

    case "Class'/Script/FactoryGame.FGBuildableBeamLightweight'": {
      return parseBuildableBeamLightweight;
    }

    case "Class'/Script/FactoryGame.FGBuildablePillarLightweight'": {
      return parseBuildablePillarLightweight;
    }

    case "Class'/Script/FactoryGame.FGBuildableWalkwayLightweight'":
    case "Class'/Script/FactoryGame.FGBuildableWalkway'": {
      return parseBuildableWalkwayLightweight;
    }

    case "Class'/Script/FactoryGame.FGBuildablePipelineSupport'": {
      return parseBuildablePipelineSupport;
    }

    case "Class'/Script/FactoryGame.FGBuildablePipeline'": {
      return parseBuildablePipeline;
    }

    case "Class'/Script/FactoryGame.FGBuildablePipelineJunction'": {
      return parseBuildablePipelineJunction;
    }

    case "Class'/Script/FactoryGame.FGBuildableResourceSink'": {
      return parseBuildableResourceSink;
    }

    case "Class'/Script/FactoryGame.FGBuildableResourceSinkShop'": {
      return parseBuildableResourceSinkShop;
    }

    case "Class'/Script/FactoryGame.FGVehicleDescriptor'": {
      return parseVehicleDescriptor;
    }

    case "Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'": {
      return parseBuildableManufacturerVariablePower;
    }

    case "Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'": {
      return parseBuildableGeneratorNuclear;
    }

    case "Class'/Script/FactoryGame.FGBuildableConveyorLift'": {
      return parseBuildableConveyorLift;
    }

    case "Class'/Script/FactoryGame.FGBuildableFoundation'":
    case "Class'/Script/FactoryGame.FGBuildableFoundationLightweight'": {
      return parseBuildableFoundation;
    }

    case "Class'/Script/FactoryGame.FGBuildableRamp'": {
      return parseBuildableRamp;
    }

    case "Class'/Script/FactoryGame.FGBuildableSplitterSmart'": {
      return parseBuildableSplitterSmart;
    }

    case "Class'/Script/FactoryGame.FGBuildableAttachmentMerger'": {
      return parseBuildableAttachmentMerger;
    }

    case "Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'": {
      return parseBuildableAttachmentSplitter;
    }

    case "Class'/Script/FactoryGame.FGBuildableJumppad'": {
      return parseBuildableJumppad;
    }

    case "Class'/Script/FactoryGame.FGBuildableDockingStation'": {
      return parseBuildableDockingStation;
    }

    case "Class'/Script/FactoryGame.FGPipeHyperStart'": {
      return parsePipeHyperStart;
    }

    case "Class'/Script/FactoryGame.FGBuildablePipeHyper'": {
      return parseBuildablePipeHyper;
    }

    case "Class'/Script/FactoryGame.FGBuildablePowerStorage'": {
      return parseBuildablePowerStorage;
    }

    case "Class'/Script/FactoryGame.FGBuildableRailroadSignal'": {
      return parseBuildableRailroadSignal;
    }

    case "Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'": {
      return parseBuildableTrainPlatformEmpty;
    }

    case "Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'": {
      return parseBuildableTrainPlatformCargo;
    }

    case "Class'/Script/FactoryGame.FGBuildableRailroadStation'": {
      return parseBuildableRailroadStation;
    }

    case "Class'/Script/FactoryGame.FGBuildableRailroadTrack'": {
      return parseBuildableRailroadTrack;
    }

    case "Class'/Script/FactoryGame.FGHoverPack'": {
      return parseHoverPack;
    }

    case "Class'/Script/FactoryGame.FGEquipmentZipline'": {
      return parseEquipmentZipline;
    }

    case "Class'/Script/FactoryGame.FGBuildableCircuitSwitch'": {
      return parseBuildableCircuitSwitch;
    }

    case "Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'": {
      return parseBuildableGeneratorGeoThermal;
    }

    case "Class'/Script/FactoryGame.FGParachute'": {
      return parseParachute;
    }

    case "Class'/Script/FactoryGame.FGBuildableRadarTower'": {
      return parseBuildableRadarTower;
    }

    case "Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'": {
      return parseBuildableFactorySimpleProducer;
    }

    case "Class'/Script/FactoryGame.FGBuildableWidgetSign'": {
      return parseBuildableWidgetSign;
    }

    case "Class'/Script/FactoryGame.FGBuildableLightSource'": {
      return parseBuildableLightSource;
    }

    case "Class'/Script/FactoryGame.FGBuildableLadder'": {
      return parseBuildableLadder;
    }

    case "Class'/Script/FactoryGame.FGBuildableStair'": {
      return parseBuildableStair;
    }

    case "Class'/Script/FactoryGame.FGBuildableFloodlight'": {
      return parseBuildableFloodlight;
    }

    case "Class'/Script/FactoryGame.FGBuildableLightsControlPanel'": {
      return parseBuildableLightsControlPanel;
    }

    case "Class'/Script/FactoryGame.FGBuildablePassthrough'": {
      return parseBuildablePassthrough;
    }

    case "Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'": {
      return parseItemDescriptorNuclearFuel;
    }

    case "Class'/Script/FactoryGame.FGAmmoTypeInstantHit'": {
      return parseAmmoTypeInstantHit;
    }

    case "Class'/Script/FactoryGame.FGObjectScanner'": {
      return parseObjectScanner;
    }

    case "Class'/Script/FactoryGame.FGBuildablePipelinePump'": {
      return parseBuildablePipelinePump;
    }

    case "Class'/Script/FactoryGame.FGBuildablePipeReservoir'": {
      return parseBuildablePipeReservoir;
    }

    default: {
      assertNever(`Unhandled class: ${className}`);
    }
  }
}

export function loadRaw() {
  return parseRawGameData(rawGameDataByNativeClass());
}
