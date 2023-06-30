import { assert } from "chai";

import { gameData } from "~/data";
import { type Machine } from "~/data/types";

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
      constructorM: Readonly<Machine>;
      assembler: Readonly<Machine>;
      manufacturer: Readonly<Machine>;
      refinery: Readonly<Machine>;
      blender: Readonly<Machine>;
      particleAccelerator: Readonly<Machine>;
      smelter: Readonly<Machine>;
      foundry: Readonly<Machine>;
      packager: Readonly<Machine>;
      coalGenerator: Readonly<Machine>;
      fuelGenerator: Readonly<Machine>;
      nuclearPowerPlant: Readonly<Machine>;
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

  assert(constructorM !== undefined, 'Cannot find machine: "constructor"');
  assert(assembler !== undefined, 'Cannot find machine: "assembler"');
  assert(manufacturer !== undefined, 'Cannot find machine: "manufacturer"');
  assert(refinery !== undefined, 'Cannot find machine: "refinery"');
  assert(blender !== undefined, 'Cannot find machine: "blender"');
  assert(
    particleAccelerator !== undefined,
    'Cannot find machine: "particleAccelerator"',
  );
  assert(smelter !== undefined, 'Cannot find machine: "smelter"');
  assert(foundry !== undefined, 'Cannot find machine: "foundry"');
  assert(packager !== undefined, 'Cannot find machine: "packager"');
  assert(coalGenerator !== undefined, 'Cannot find machine: "coalGenerator"');
  assert(fuelGenerator !== undefined, 'Cannot find machine: "fuelGenerator"');
  assert(
    nuclearPowerPlant !== undefined,
    'Cannot find machine: "nuclearPowerPlant"',
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
  };

  return m_machinesByName;
}
