import { assert } from "chai";

import { gameData } from "~/data";
import {
  type SinkMachine,
  type ProductionMachine,
  type GeneratorFuelMachine,
  type Machine,
  isProductionMachine,
  isGeneratorFuelMachine,
  isResourceSinkMachine,
} from "~/data/types";

/**
 * Cache the list of machines.
 */
const m_Machine: ReadonlyArray<Readonly<Machine>> | undefined = undefined;

/**
 * Get the machines.
 */
export function useMachines() {
  if (m_Machine !== undefined) {
    return m_Machine;
  }
  const {
    constructorM,
    assembler,
    manufacturer,
    refinery,
    blender,
    particleAccelerator,
    smelter,
    foundry,
    packager,
    coalGenerator,
    fuelGenerator,
    nuclearPowerPlant,
  } = useMachinesByName();

  return [
    constructorM,
    assembler,
    manufacturer,
    refinery,
    blender,
    particleAccelerator,
    smelter,
    foundry,
    packager,
    coalGenerator,
    fuelGenerator,
    nuclearPowerPlant,
  ];
}

/**
 * Cache the list of machines by name.
 */
let m_machinesByName:
  | Readonly<{
      constructorM: Readonly<ProductionMachine>;
      assembler: Readonly<ProductionMachine>;
      manufacturer: Readonly<ProductionMachine>;
      refinery: Readonly<ProductionMachine>;
      blender: Readonly<ProductionMachine>;
      particleAccelerator: Readonly<ProductionMachine>;
      smelter: Readonly<ProductionMachine>;
      foundry: Readonly<ProductionMachine>;
      packager: Readonly<ProductionMachine>;
      coalGenerator: Readonly<GeneratorFuelMachine>;
      fuelGenerator: Readonly<GeneratorFuelMachine>;
      nuclearPowerPlant: Readonly<GeneratorFuelMachine>;
      resourceSink: Readonly<SinkMachine>;
    }>
  | undefined = undefined;

/**
 * Get the resources.
 */
export function useMachinesByName() {
  if (m_machinesByName !== undefined) {
    return m_machinesByName;
  }

  const machines = [
    ...gameData.machines.generator.fuel.values(),
    ...gameData.machines.generator.geoThermal.values(),
    ...gameData.machines.production.values(),
    ...gameData.machines.sink.values(),
  ];

  const machinesMap = new Map(machines.map((machine) => [machine.id, machine]));

  // const minerMk1 = machinesMap.get("Build_MinerMk1_C");
  // const minerMk2 = machinesMap.get("Build_MinerMk2_C");
  // const minerMk3 = machinesMap.get("Build_MinerMk3_C");
  // const oilPump = machinesMap.get("Build_OilPump_C");
  // const waterPump = machinesMap.get("Build_WaterPump_C");
  // const frackingCore = machinesMap.get("Build_FrackingSmasher_C");
  // const frackingSatellite = machinesMap.get("Build_FrackingExtractor_C");

  const constructorM = machinesMap.get("Build_ConstructorMk1_C");
  const assembler = machinesMap.get("Build_AssemblerMk1_C");
  const manufacturer = machinesMap.get("Build_ManufacturerMk1_C");
  const refinery = machinesMap.get("Build_OilRefinery_C");
  const blender = machinesMap.get("Build_Blender_C");
  const particleAccelerator = machinesMap.get("Build_HadronCollider_C");

  const smelter = machinesMap.get("Build_SmelterMk1_C");
  const foundry = machinesMap.get("Build_FoundryMk1_C");
  const packager = machinesMap.get("Build_Packager_C");

  const coalGenerator = machinesMap.get("Build_GeneratorCoal_C");
  const fuelGenerator = machinesMap.get("Build_GeneratorFuel_C");
  const nuclearPowerPlant = machinesMap.get("Build_GeneratorNuclear_C");

  const resourceSink = machinesMap.get("Build_ResourceSink_C");

  assert(
    constructorM !== undefined && isProductionMachine(constructorM),
    'Cannot find machine: "constructor"',
  );
  assert(
    assembler !== undefined && isProductionMachine(assembler),
    'Cannot find machine: "assembler"',
  );
  assert(
    manufacturer !== undefined && isProductionMachine(manufacturer),
    'Cannot find machine: "manufacturer"',
  );
  assert(
    refinery !== undefined && isProductionMachine(refinery),
    'Cannot find machine: "refinery"',
  );
  assert(
    blender !== undefined && isProductionMachine(blender),
    'Cannot find machine: "blender"',
  );
  assert(
    particleAccelerator !== undefined &&
      isProductionMachine(particleAccelerator),
    'Cannot find machine: "particleAccelerator"',
  );
  assert(
    smelter !== undefined && isProductionMachine(smelter),
    'Cannot find machine: "smelter"',
  );
  assert(
    foundry !== undefined && isProductionMachine(foundry),
    'Cannot find machine: "foundry"',
  );
  assert(
    packager !== undefined && isProductionMachine(packager),
    'Cannot find machine: "packager"',
  );
  assert(
    coalGenerator !== undefined && isGeneratorFuelMachine(coalGenerator),
    'Cannot find machine: "coalGenerator"',
  );
  assert(
    fuelGenerator !== undefined && isGeneratorFuelMachine(fuelGenerator),
    'Cannot find machine: "fuelGenerator"',
  );
  assert(
    nuclearPowerPlant !== undefined &&
      isGeneratorFuelMachine(nuclearPowerPlant),
    'Cannot find machine: "nuclearPowerPlant"',
  );
  assert(
    resourceSink !== undefined && isResourceSinkMachine(resourceSink),
    'Cannot find machine: "resourceSink"',
  );

  m_machinesByName = {
    constructorM,
    assembler,
    manufacturer,
    refinery,
    blender,
    particleAccelerator,
    smelter,
    foundry,
    packager,
    coalGenerator,
    fuelGenerator,
    nuclearPowerPlant,
    resourceSink,
  };

  return m_machinesByName;
}
