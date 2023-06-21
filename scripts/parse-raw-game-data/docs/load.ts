import { assert } from "chai";

import { isObject, assertNever } from "~/utils";
import "~/polyfills";

import docsJsonData from "../data/Docs.json" assert { type: "json" };
import samJsonData from "../data/Sam.json" assert { type: "json" };

import {
  type BaseItem,
  type Base,
  type BuildableManufacturer,
  type Item,
  type Recipe,
  type Schematic,
} from "./parsers";
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
  parseBuildablePriorityPowerSwitch,
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
  const data = docsJsonData;
  const items = data.find(
    (c) =>
      c.NativeClass ===
      "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'",
  ) as unknown;
  assert(isObject(items) && "Classes" in items && Array.isArray(items.Classes));
  items.Classes.push(samJsonData);

  return new Map<string, ReadonlyArray<unknown>>(
    data.map((group): [string, ReadonlyArray<unknown>] => {
      assert(
        isObject(group) &&
          "NativeClass" in group &&
          typeof group.NativeClass === "string" &&
          "Classes" in group &&
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
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPoleDescriptor'": {
      return parseBaseItem;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'": {
      return parseItem;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'": {
      return parseResource;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'": {
      return parseBlueprintDesigner;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'": {
      return parseDroneStation;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableEquipment'": {
      return parseConsumableEquipment;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'": {
      return parseSchematic;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'": {
      return parseConsumableDescriptor;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowDispenser'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactoryBuilding'": {
      return parseBuildable;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWall'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWallLightweight'": {
      return parseBuildableWall;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'": {
      return parseBuildableCornerWall;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'": {
      return parseBuildableDoor;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGCustomizationRecipe'": {
      return parseRecipe;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'": {
      return parseBuildableFrackingExtractor;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'": {
      return parseBuildableFrackingActivator;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'": {
      return parseBuildableResourceExtractor;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'": {
      return parseBuildableBuilding;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTradingPost'": {
      return parseBuildableTradingPost;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'": {
      return parseBuildablePoleLightweight;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'": {
      return parseBuildableConveyorBelt;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'": {
      return parseBuildableWire;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'": {
      return parseBuildablePowerPole;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGChainsaw'": {
      return parseChainsaw;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGGolfCartDispenser'": {
      return parseGolfCartDispenser;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSuitBase'": {
      return parseSuitBase;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGJetPack'": {
      return parseJetPack;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGJumpingStilts'": {
      return parseJumpingStilts;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'": {
      return parseAmmoTypeProjectile;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'": {
      return parseAmmoTypeSpreadshot;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGWeapon'": {
      return parseWeapon;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGChargedWeapon'": {
      return parseChargedWeapon;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentStunSpear'": {
      return parseEquipmentStunSpear;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGGasMask'": {
      return parseGasMask;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'": {
      return parseBuildableWaterPump;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'": {
      return parseBuildableManufacturer;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPortableMinerDispenser'": {
      return parsePortableMinerDispenser;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'": {
      return parseBuildableStorage;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'": {
      return parseBuildableGeneratorFuel;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'": {
      return parseBuildableMAM;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeamLightweight'": {
      return parseBuildableBeamLightweight;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillarLightweight'": {
      return parseBuildablePillarLightweight;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkwayLightweight'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkway'": {
      return parseBuildableWalkwayLightweight;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineSupport'": {
      return parseBuildablePipelineSupport;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'": {
      return parseBuildablePipeline;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'": {
      return parseBuildablePipelineJunction;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'": {
      return parseBuildableResourceSink;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'": {
      return parseBuildableResourceSinkShop;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'": {
      return parseVehicleDescriptor;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'": {
      return parseBuildableManufacturerVariablePower;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'": {
      return parseBuildableGeneratorNuclear;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'": {
      return parseBuildableConveyorLift;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundation'":
    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundationLightweight'": {
      return parseBuildableFoundation;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRamp'": {
      return parseBuildableRamp;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'": {
      return parseBuildableSplitterSmart;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'": {
      return parseBuildableAttachmentMerger;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'": {
      return parseBuildableAttachmentSplitter;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'": {
      return parseBuildableJumppad;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'": {
      return parseBuildableDockingStation;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'": {
      return parsePipeHyperStart;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'": {
      return parseBuildablePipeHyper;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'": {
      return parseBuildablePowerStorage;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'": {
      return parseBuildableRailroadSignal;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'": {
      return parseBuildableTrainPlatformEmpty;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'": {
      return parseBuildableTrainPlatformCargo;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'": {
      return parseBuildableRailroadStation;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'": {
      return parseBuildableRailroadTrack;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGHoverPack'": {
      return parseHoverPack;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentZipline'": {
      return parseEquipmentZipline;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'": {
      return parseBuildableCircuitSwitch;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePriorityPowerSwitch'": {
      return parseBuildablePriorityPowerSwitch;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'": {
      return parseBuildableGeneratorGeoThermal;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGParachute'": {
      return parseParachute;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'": {
      return parseBuildableRadarTower;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'": {
      return parseBuildableFactorySimpleProducer;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'": {
      return parseBuildableWidgetSign;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'": {
      return parseBuildableLightSource;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'": {
      return parseBuildableLadder;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStair'": {
      return parseBuildableStair;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'": {
      return parseBuildableFloodlight;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'": {
      return parseBuildableLightsControlPanel;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthrough'": {
      return parseBuildablePassthrough;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'": {
      return parseItemDescriptorNuclearFuel;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'": {
      return parseAmmoTypeInstantHit;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGObjectScanner'": {
      return parseObjectScanner;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'": {
      return parseBuildablePipelinePump;
    }

    case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'": {
      return parseBuildablePipeReservoir;
    }

    default: {
      assertNever(`Unhandled class: ${className}`);
    }
  }
}

function getItems(staticData: Readonly<StaticData>) {
  const itemClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'",
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
            if ("mResourceSinkPoints" in item) {
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
        if (!items.has(item) && "mResourceSinkPoints" in item) {
          console.log("Missing Item Class:", nativeClass);
          return false;
        }
        return true;
      });
    }),
  );

  return [...items.values()];
}

function getBuildings(staticData: Readonly<StaticData>) {
  const buildingClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGPoleDescriptor'",
  ]);

  const buildings = new Set(
    staticData
      .entries()
      .filter((data): data is [string, Set<BaseItem>] => {
        const [nativeClass] = data;
        return buildingClasses.has(nativeClass);
      })
      .flatMap(([nativeClass, set]) => {
        // TODO: verify it's a building
        // assert(
        //   set.values().every((building) => {
        //     return true;
        //   }),
        // );
        return set.values();
      }),
  );

  // TODO: verify it's a building
  // assert(
  //   staticData.entries().every(([nativeClass, buildingSet]) => {
  //     return buildingSet.values().every((building) => {
  //       return true;
  //     });
  //   }),
  // );

  return [...buildings.values()];
}

function getMachines(staticData: Readonly<StaticData>) {
  const machineClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'",
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
            if ("mManufacturingSpeed" in item) {
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
        if (!machines.has(machine) && "mManufacturingSpeed" in machine) {
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
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'",
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGCustomizationRecipe'",
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
            if ("mProducedIn" in item) {
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
        if (!recipes.has(recipe) && "mProducedIn" in recipe) {
          console.log("Missing Recipe Class:", nativeClass);
          return false;
        }
        return true;
      }),
    ),
  );

  return [...recipes.values()];
}

function getSchematics(staticData: Readonly<StaticData>) {
  const schematicClasses = new Set([
    "/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'",
  ]);

  const schematics = new Set(
    staticData
      .entries()
      .filter((data): data is [string, Set<Schematic>] => {
        const [nativeClass] = data;
        return schematicClasses.has(nativeClass);
      })
      .flatMap(([nativeClass, set]) => {
        assert(
          set.values().every((item) => {
            if ("mTechTier" in item) {
              return true;
            }
            console.log("Not an Schematic Class:", nativeClass);
            return false;
          }),
        );
        return set.values();
      }),
  );

  assert(
    staticData.entries().every(([nativeClass, schematicSet]) =>
      schematicSet.values().every((schematic) => {
        if (!schematics.has(schematic) && "mTechTier" in schematic) {
          console.log("Missing Schematic Class:", nativeClass);
          return false;
        }
        return true;
      }),
    ),
  );

  return [...schematics.values()];
}

export function loadData() {
  const staticData = parseRawGameData(rawGameDataByNativeClass());
  const items = getItems(staticData);
  const buildings = getBuildings(staticData);
  const machines = getMachines(staticData);
  const recipes = getRecipes(staticData);
  const schematics = getSchematics(staticData);

  return {
    items,
    buildings,
    machines,
    recipes,
    schematics,
  };
}
