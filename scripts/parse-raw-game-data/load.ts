import assert from "node:assert/strict";

import { isObject, assertNever } from "~/utils";

import docsJsonData from "./docs.json" assert { type: "json" };
import type { Base, BuildableManufacturer, Item, Recipe } from "./parsers";
import {
  parseAmmoTypeInstantHit,
  parseAmmoTypeProjectile,
  parseAmmoTypeSpreadshot,
  parseBaseItem,
  parseBlueprintDesigner,
  parseBuildable,
  parseBuildableAttachmentMerger,
  parseBuildableAttachmentSplitter,
  parseBuildableBeamLightweight,
  parseBuildableBuilding,
  parseBuildableCircuitSwitch,
  parseBuildableConveyorBelt,
  parseBuildableConveyorLift,
  parseBuildableCornerWall,
  parseBuildableDockingStation,
  parseBuildableDoor,
  parseBuildableFactorySimpleProducer,
  parseBuildableFloodlight,
  parseBuildableFoundation,
  parseBuildableFrackingActivator,
  parseBuildableFrackingExtractor,
  parseBuildableGeneratorFuel,
  parseBuildableGeneratorGeoThermal,
  parseBuildableGeneratorNuclear,
  parseBuildableJumppad,
  parseBuildableLadder,
  parseBuildableLightsControlPanel,
  parseBuildableLightSource,
  parseBuildableMAM,
  parseBuildableManufacturer,
  parseBuildableManufacturerVariablePower,
  parseBuildablePassthrough,
  parseBuildablePillarLightweight,
  parseBuildablePipeHyper,
  parseBuildablePipeline,
  parseBuildablePipelineJunction,
  parseBuildablePipelinePump,
  parseBuildablePipelineSupport,
  parseBuildablePipeReservoir,
  parseBuildablePoleLightweight,
  parseBuildablePowerPole,
  parseBuildablePowerStorage,
  parseBuildableRadarTower,
  parseBuildableRailroadSignal,
  parseBuildableRailroadStation,
  parseBuildableRailroadTrack,
  parseBuildableRamp,
  parseBuildableResourceExtractor,
  parseBuildableResourceSink,
  parseBuildableResourceSinkShop,
  parseBuildableSplitterSmart,
  parseBuildableStair,
  parseBuildableStorage,
  parseBuildableTradingPost,
  parseBuildableTrainPlatformCargo,
  parseBuildableTrainPlatformEmpty,
  parseBuildableWalkwayLightweight,
  parseBuildableWall,
  parseBuildableWaterPump,
  parseBuildableWidgetSign,
  parseBuildableWire,
  parseChainsaw,
  parseChargedWeapon,
  parseConsumableDescriptor,
  parseConsumableEquipment,
  parseDroneStation,
  parseEquipmentStunSpear,
  parseEquipmentZipline,
  parseGasMask,
  parseGolfCartDispenser,
  parseHoverPack,
  parseItem,
  parseItemDescriptorNuclearFuel,
  parseJetPack,
  parseJumpingStilts,
  parseObjectScanner,
  parseParachute,
  parsePipeHyperStart,
  parsePortableMinerDispenser,
  parseRecipe,
  parseResource,
  parseSchematic,
  parseSuitBase,
  parseVehicleDescriptor,
  parseWeapon,
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

type StaticData = Map<string, Set<Base>>;

function parseRawGameData(
  data: ReadonlyMap<string, ReadonlyArray<unknown>>,
): StaticData {
  return new Map(
    data.entries().map(([nativeClass, d]) => {
      const parser = getClassParser(nativeClass);
      return [nativeClass, new Set(d.map((i): Base => parser(i)))];
    }),
  );
}

function getClassParser(className: string): (data: unknown) => Base {
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

function getItems(staticData: Readonly<StaticData>) {
  const itemClasses = new Set([
    "Class'/Script/FactoryGame.FGItemDescriptor'",
    "Class'/Script/FactoryGame.FGConsumableDescriptor'",
    "Class'/Script/FactoryGame.FGItemDescriptorBiomass'",
    "Class'/Script/FactoryGame.FGResourceDescriptor'",
    "Class'/Script/FactoryGame.FGEquipmentDescriptor'",
    "Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'",
    "Class'/Script/FactoryGame.FGAmmoTypeProjectile'",
    "Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'",
    "Class'/Script/FactoryGame.FGAmmoTypeInstantHit'",
  ]);

  const items = new Set(
    staticData
      .entries()
      .filter((data): data is [string, Set<Item>] => {
        const [nativeClass] = data;
        return itemClasses.has(nativeClass);
      })
      .flatMap(([nativeClass, set]) => {
        assert(
          set.values().every((item) => {
            if (Object.hasOwn(item, "mResourceSinkPoints")) {
              return true;
            }
            console.log("Not an Item Class:", nativeClass);
            return false;
          }),
        );
        return set.values();
      }),
  );

  assert(
    staticData.entries().every(([nativeClass, itemSet]) => {
      return itemSet.values().every((item) => {
        if (!items.has(item) && Object.hasOwn(item, "mResourceSinkPoints")) {
          console.log("Missing Item Class:", nativeClass);
          return false;
        }
        return true;
      });
    }),
  );

  return [...items.values()];
}

function getMachines(staticData: Readonly<StaticData>) {
  const machineClasses = new Set([
    "Class'/Script/FactoryGame.FGBuildableManufacturer'",
    "Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'",
  ]);

  const machines = new Set(
    staticData
      .entries()
      .filter((data): data is [string, Set<BuildableManufacturer>] => {
        const [nativeClass] = data;
        return machineClasses.has(nativeClass);
      })
      .flatMap(([nativeClass, set]) => {
        assert(
          set.values().every((item) => {
            if (Object.hasOwn(item, "mManufacturingSpeed")) {
              return true;
            }
            console.log("Not an Machine Class:", nativeClass);
            return false;
          }),
        );
        return set.values();
      }),
  );

  assert(
    staticData.entries().every(([nativeClass, machineSet]) =>
      machineSet.values().every((machine) => {
        if (
          !machines.has(machine) &&
          Object.hasOwn(machine, "mManufacturingSpeed")
        ) {
          console.log("Missing Machine Class:", nativeClass);
          return false;
        }
        return true;
      }),
    ),
  );

  return [...machines.values()];
}

function getRecipes(staticData: Readonly<StaticData>) {
  const recipeClasses = new Set([
    "Class'/Script/FactoryGame.FGRecipe'",
    "Class'/Script/FactoryGame.FGCustomizationRecipe'",
  ]);

  const recipes = new Set(
    staticData
      .entries()
      .filter((data): data is [string, Set<Recipe>] => {
        const [nativeClass] = data;
        return recipeClasses.has(nativeClass);
      })
      .flatMap(([nativeClass, set]) => {
        assert(
          set.values().every((item) => {
            if (Object.hasOwn(item, "mProducedIn")) {
              return true;
            }
            console.log("Not an Recipe Class:", nativeClass);
            return false;
          }),
        );
        return set.values();
      }),
  );

  assert(
    staticData.entries().every(([nativeClass, recipeSet]) =>
      recipeSet.values().every((recipe) => {
        if (!recipes.has(recipe) && Object.hasOwn(recipe, "mProducedIn")) {
          console.log("Missing Recipe Class:", nativeClass);
          return false;
        }
        return true;
      }),
    ),
  );

  return [...recipes.values()];
}

export function loadStaticGameData() {
  const staticData = parseRawGameData(rawGameDataByNativeClass());
  const items = getItems(staticData);
  const machines = getMachines(staticData);
  const recipes = getRecipes(staticData);

  return {
    items,
    machines,
    recipes,
  };
}
