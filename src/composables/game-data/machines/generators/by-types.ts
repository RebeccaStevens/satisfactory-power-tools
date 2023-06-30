import { gameData } from "~/data";
import { type GeneratorFuelMachine } from "~/data/types";

/**
 * Cache the list of generator machines.
 */
let m_generatorFuelMachines:
  | ReadonlyArray<Readonly<GeneratorFuelMachine>>
  | undefined = undefined;

/**
 * Get the generator machines.
 */
export function useGeneratorFuelMachines() {
  if (m_generatorFuelMachines !== undefined) {
    return m_generatorFuelMachines;
  }
  m_generatorFuelMachines = [...gameData.machines.generator.fuel.values()];
  return m_generatorFuelMachines;
}
