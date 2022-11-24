import type { HasMachineRecipes, Machine } from "./types";

/**
 * Type guard for a machine being a machine with recipes.
 */
export function hasMachineRecipes(
  machine: Machine,
): machine is Machine & HasMachineRecipes {
  return (
    Object.hasOwn(machine, "machineRecipes") &&
    machine.machineRecipes instanceof Set
  );
}
