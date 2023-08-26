import { assert } from "chai";

import { gameData } from "~/data";
import {
  type MegaWatts,
  type QuantityPerMinute,
  type Item,
  type SpecialItem,
  type GeneralItem,
} from "~/data/types";

import { useAutomatableRecipes } from "../recipies";

/**
 * Cache the list of general items.
 */
let m_generalItems: ReadonlyArray<Readonly<GeneralItem>> | undefined =
  undefined;

/**
 * Get the general items.
 */
export function useGeneralItems() {
  if (m_generalItems !== undefined) {
    return m_generalItems;
  }
  m_generalItems = [...gameData.items.values()];
  return m_generalItems;
}

/**
 * Cache the list of special items.
 */
let m_specialItems: ReadonlyArray<Readonly<SpecialItem>> | undefined =
  undefined;

/**
 * Get the special items.
 */
export function useSpecialItems() {
  if (m_specialItems !== undefined) {
    return m_specialItems;
  }
  m_specialItems = [...gameData.specialItems.values()];
  return m_specialItems;
}

/**
 * Cache the list of all items.
 */
let m_items: ReadonlyArray<Readonly<Item>> | undefined = undefined;

/**
 * Get the items.
 */
export function useItems() {
  if (m_items !== undefined) {
    return m_items;
  }
  m_items = [...useGeneralItems(), ...useSpecialItems()];
  return m_items;
}

/**
 * Cache the list of resource items.
 */
const m_resourceItems: ReadonlyArray<Readonly<GeneralItem>> | undefined =
  undefined;

/**
 * Get the resources.
 */
export function useResourceItems() {
  if (m_resourceItems !== undefined) {
    return m_resourceItems;
  }
  const {
    bauxite,
    caterium,
    coal,
    copper,
    iron,
    limestone,
    nitrogen,
    oil,
    rawQuartz,
    sam,
    sulfur,
    uranium,
    water,
  } = useResourceItemsByName();
  return [
    iron,
    copper,
    limestone,
    coal,
    caterium,
    rawQuartz,
    sulfur,
    bauxite,
    uranium,
    sam,
    oil,
    nitrogen,
    water,
  ];
}

/**
 * Cache the list of resource items.
 */
let m_resourceItemsByName:
  | Readonly<{
      coal: Readonly<GeneralItem>;
      oil: Readonly<GeneralItem>;
      nitrogen: Readonly<GeneralItem>;
      bauxite: Readonly<GeneralItem>;
      copper: Readonly<GeneralItem>;
      caterium: Readonly<GeneralItem>;
      iron: Readonly<GeneralItem>;
      uranium: Readonly<GeneralItem>;
      rawQuartz: Readonly<GeneralItem>;
      sam: Readonly<GeneralItem>;
      limestone: Readonly<GeneralItem>;
      sulfur: Readonly<GeneralItem>;
      water: Readonly<GeneralItem>;
    }>
  | undefined = undefined;

/**
 * Get the resources.
 */
export function useResourceItemsByName() {
  if (m_resourceItemsByName !== undefined) {
    return m_resourceItemsByName;
  }

  const resourceItems = useGeneralItems().filter(
    (item) => item.typeId === "ore",
  );
  const resourceItemsMap = new Map(
    resourceItems.map((item) => [item.id, item]),
  );

  const coal = resourceItemsMap.get("Desc_Coal_C");
  const oil = resourceItemsMap.get("Desc_LiquidOil_C");
  const nitrogen = resourceItemsMap.get("Desc_NitrogenGas_C");
  const bauxite = resourceItemsMap.get("Desc_OreBauxite_C");
  const copper = resourceItemsMap.get("Desc_OreCopper_C");
  const caterium = resourceItemsMap.get("Desc_OreGold_C");
  const iron = resourceItemsMap.get("Desc_OreIron_C");
  const uranium = resourceItemsMap.get("Desc_OreUranium_C");
  const rawQuartz = resourceItemsMap.get("Desc_RawQuartz_C");
  const sam = resourceItemsMap.get("Desc_SAM_C");
  const limestone = resourceItemsMap.get("Desc_Stone_C");
  const sulfur = resourceItemsMap.get("Desc_Sulfur_C");
  const water = resourceItemsMap.get("Desc_Water_C");

  assert(coal !== undefined);
  assert(oil !== undefined);
  assert(nitrogen !== undefined);
  assert(bauxite !== undefined);
  assert(copper !== undefined);
  assert(caterium !== undefined);
  assert(iron !== undefined);
  assert(uranium !== undefined);
  assert(rawQuartz !== undefined);
  assert(sam !== undefined);
  assert(limestone !== undefined);
  assert(sulfur !== undefined);
  assert(water !== undefined);

  m_resourceItemsByName = {
    bauxite,
    caterium,
    coal,
    copper,
    iron,
    limestone,
    nitrogen,
    oil,
    rawQuartz,
    sam,
    sulfur,
    uranium,
    water,
  };

  return m_resourceItemsByName;
}

/**
 * Cache the list of automatable items.
 */
let m_automatableItems: ReadonlyArray<Readonly<Item>> | undefined = undefined;

/**
 * Get the automatable items.
 */
export function useAutomatableItems() {
  if (m_automatableItems !== undefined) {
    return m_automatableItems;
  }
  m_automatableItems = [
    ...new Set(
      useAutomatableRecipes().flatMap((recipe) => [...recipe.products.keys()]),
    ).values(),
    ...useSpecialItems(),
  ];
  return m_automatableItems;
}

/**
 * Cache the list of optimizable items.
 */
let m_optimizableItems: ReadonlyArray<Readonly<Item>> | undefined = undefined;

/**
 * Get the optimizable items.
 */
export function useOptimizableItems() {
  if (m_optimizableItems !== undefined) {
    return m_optimizableItems;
  }
  m_optimizableItems = useAutomatableItems().filter(
    (item) => !("typeId" in item) || item.typeId !== "ore",
  );
  return m_optimizableItems;
}

export type ResourceItemRateValue = {
  item: Readonly<GeneralItem>;
  amount: QuantityPerMinute;
  power: MegaWatts;
};

/**
 * Cache the list of optimizable items.
 */
let m_resourceItemsMapMaxRates:
  | Readonly<{
      effective: Readonly<ReadonlyArray<ResourceItemRateValue>>;
      full: Readonly<ReadonlyArray<ResourceItemRateValue>>;
    }>
  | undefined = undefined;

/**
 * Get the maximum rates at which resource items can be obtained.
 */
export function useResourceItemsMapMaxRates() {
  if (m_resourceItemsMapMaxRates !== undefined) {
    return m_resourceItemsMapMaxRates;
  }

  const {
    bauxite,
    caterium,
    coal,
    copper,
    iron,
    limestone,
    nitrogen,
    oil,
    rawQuartz,
    sulfur,
    uranium,
  } = useResourceItemsByName();

  m_resourceItemsMapMaxRates = {
    effective: [
      {
        item: iron,
        amount: 70_380 as QuantityPerMinute,
        power: 10_076.075 as MegaWatts,
      },
      {
        item: copper,
        amount: 28_860 as QuantityPerMinute,
        power: 4411.067 as MegaWatts,
      },
      {
        item: limestone,
        amount: 52_860 as QuantityPerMinute,
        power: 7482.14 as MegaWatts,
      },
      {
        item: coal,
        amount: 30_120 as QuantityPerMinute,
        power: 4380.594 as MegaWatts,
      },
      {
        item: caterium,
        amount: 11_040 as QuantityPerMinute,
        power: 1261.837 as MegaWatts,
      },
      {
        item: rawQuartz,
        amount: 10_500 as QuantityPerMinute,
        power: 1393.043 as MegaWatts,
      },
      {
        item: sulfur,
        amount: 6840 as QuantityPerMinute,
        power: 976.851 as MegaWatts,
      },
      {
        item: bauxite,
        amount: 9780 as QuantityPerMinute,
        power: 1450.04 as MegaWatts,
      },
      {
        item: uranium,
        amount: 2100 as QuantityPerMinute,
        power: 402.929 as MegaWatts,
      },
      {
        item: oil,
        amount: 9900 as QuantityPerMinute,
        power: 5036.621 as MegaWatts,
      },
      {
        item: nitrogen,
        amount: 12_000 as QuantityPerMinute,
        power: 2518.31 as MegaWatts,
      },
      // {
      //   item: sam,
      //   amount: 5400 as QuantityPerMinute,
      //   power: 1410.254 as MegaWatts,
      // },
    ],
    full: [
      {
        item: coal,
        amount: 36_000 as QuantityPerMinute,
        power: 5036.621 as MegaWatts,
      },
      {
        item: oil,
        amount: 9900 as QuantityPerMinute,
        power: 5036.621 as MegaWatts,
      },
      {
        item: nitrogen,
        amount: 12_000 as QuantityPerMinute,
        power: 2518.31 as MegaWatts,
      },
      {
        item: bauxite,
        amount: 12_300 as QuantityPerMinute,
        power: 1712.451 as MegaWatts,
      },
      {
        item: copper,
        amount: 33_900 as QuantityPerMinute,
        power: 4935.889 as MegaWatts,
      },
      {
        item: caterium,
        amount: 14_400 as QuantityPerMinute,
        power: 1611.718 as MegaWatts,
      },
      {
        item: iron,
        amount: 89_700 as QuantityPerMinute,
        power: 12_087.892 as MegaWatts,
      },
      {
        item: uranium,
        amount: 2100 as QuantityPerMinute,
        power: 402.929 as MegaWatts,
      },
      {
        item: rawQuartz,
        amount: 12_600 as QuantityPerMinute,
        power: 1611.718 as MegaWatts,
      },
      {
        item: limestone,
        amount: 64_200 as QuantityPerMinute,
        power: 8662.989 as MegaWatts,
      },
      {
        item: sulfur,
        amount: 8100 as QuantityPerMinute,
        power: 1108.056 as MegaWatts,
      },
      // {
      //   item: sam,
      //   amount: 5400 as QuantityPerMinute,
      //   power: 1410.254 as MegaWatts,
      // },
    ],
  };
  return m_resourceItemsMapMaxRates;
}
