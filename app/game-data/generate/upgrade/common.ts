import { Array, Effect, pipe } from "effect";

import { LookupError } from "~/errors";
import { type VendorItemAmount, VendorItemForm } from "~/game-data/generate/parsers/types";
import type { Item, ItemAmounts, Machine } from "~/game-data/generate/upgrade/types";
import { type ClassName, ItemForm } from "~/game-data/types";
import { AssertPath, Int } from "~/types";

export function upgradeItemAmounts(
  list: VendorItemAmount[] | null,
  items: ReadonlyMap<ClassName, Item>,
): Effect.Effect<ItemAmounts, LookupError> {
  return list === null
    ? Effect.succeed(new Map())
    : pipe(
        list,
        Array.map((v) => upgradeItemAmount(v, items)),
        Effect.allSuccesses, // TODO: change to `Effect.all`
        Effect.andThen((entries) => new Map(entries)),
      );
}

export function upgradeItemAmount(
  itemAmount: VendorItemAmount,
  items: ReadonlyMap<ClassName, Item>,
): Effect.Effect<[Item, Int], LookupError> {
  const item = items.get(itemAmount.itemClass);

  if (item === undefined) {
    return Effect.fail(new LookupError(`Failed to find item with class "${itemAmount.itemClass}"`));
  }

  return Effect.succeed([item, Int(itemAmount.amount)]);
}

export function upgradeItemForm(vendorItemForm: VendorItemForm): ItemForm {
  switch (vendorItemForm) {
    case VendorItemForm.Invalid: {
      return ItemForm.Invalid;
    }
    case VendorItemForm.Solid: {
      return ItemForm.Solid;
    }
    case VendorItemForm.Liquid: {
      return ItemForm.Liquid;
    }
    case VendorItemForm.Gas: {
      return ItemForm.Gas;
    }
  }
}

export function upgradeMachineReferences(
  ids: string[] | null,
  machines: ReadonlyMap<ClassName, Machine>,
): Effect.Effect<Machine[], LookupError> {
  const ignoreClasses = new Set([
    "BP_BuildGun_C",
    "BP_WorkBenchComponent_C",
    "BP_WorkshopComponent_C",
    "Build_AutomatedWorkBench_C",
    "FGBuildableAutomatedWorkBench",
    "FGBuildGun",
  ]);

  return ids === null
    ? Effect.succeed([])
    : pipe(
        ids,
        Array.filter((id) => !ignoreClasses.has(id)),
        Array.map((id) => upgradeMachineReference(id, machines)),
        Effect.all,
      );
}

export function upgradeMachineReference(
  id: string,
  machines: ReadonlyMap<ClassName, Machine>,
): Effect.Effect<Machine, LookupError> {
  const machine = machines.get(id);

  if (machine === undefined) {
    return Effect.fail(new LookupError(`Failed to find machine with class "${id}"`));
  }

  return Effect.succeed(machine);
}

export function upgradeAssetPath(path: string | null): AssertPath | undefined {
  return path === null ? undefined : AssertPath(path);
}

export const exclude = new Set([
  "Build_PillarTop_C",
  "Desc_PillarTop_C",
  "Desc_Wall_Conveyor_8x4_04_C",
  "Build_Wall_Conveyor_8x4_04_C",
  "Desc_Wall_Conveyor_8x4_04_Steel_C",
  "Build_Wall_Conveyor_8x4_04_Steel_C",
  "Desc_Wall_Window_8x4_03_Steel_C",
] as const);
