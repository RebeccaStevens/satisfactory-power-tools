/* eslint-disable functional/functional-parameters -- @see https://github.com/eslint-functional/eslint-plugin-functional/issues/675 */
import { gameInfo } from "~/data";

export type ItemGroup = {
  id: string;
  label: string;
  menuPriority: number;
};

let m_itemTypeGroups:
  | Readonly<ReadonlyMap<string, Readonly<ItemGroup>>>
  | undefined = undefined;

/**
 * Use the group form item types.
 */
export function useItemTypeGroups(): Readonly<
  ReadonlyMap<string, Readonly<ItemGroup>>
> {
  if (m_itemTypeGroups !== undefined) {
    return m_itemTypeGroups;
  }
  m_itemTypeGroups = new Map(
    [
      {
        id: "alien",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 4,
      },
      {
        id: "ammo",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 12,
      },
      {
        id: "communication",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 9,
      },
      {
        id: "consume",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 11,
      },
      {
        id: "container",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 10,
      },
      {
        id: "electronic",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 8,
      },
      {
        id: "elevator",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 14,
      },
      {
        id: "fluid",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 5,
      },
      {
        id: "industrial",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 7,
      },
      {
        id: "ingot",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 2,
      },
      {
        id: "mineral",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 3,
      },
      {
        id: "nuclear",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 13,
      },
      {
        id: "ore",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 1,
      },
      {
        id: "packaged",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 5.1,
      },
      {
        id: "special",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 15,
      },
      {
        id: "standard",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 6,
      },
      {
        id: "equip",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 20,
      },
      {
        id: "xmas",
        get label() {
          return getItemTypeGroupName(this.id);
        },
        menuPriority: 99,
      },
    ].map((data) => [data.id, data]),
  );
  return m_itemTypeGroups;
}

let m_itemTierGroups:
  | Readonly<ReadonlyMap<string, Readonly<ItemGroup>>>
  | undefined = undefined;

/**
 * Use the group form item tiers.
 */
export function useItemTierGroups(): Readonly<
  ReadonlyMap<string, Readonly<ItemGroup>>
> {
  if (m_itemTierGroups !== undefined) {
    return m_itemTierGroups;
  }
  m_itemTierGroups = new Map(
    [
      {
        id: "tier0",
        get label() {
          return getItemTierGroupName("tutorial");
        },
        menuPriority: 0,
      },
      ...Array.from({ length: gameInfo.tiers.count }, (v, i) => {
        const tier = i + 1;
        return {
          id: `tier${tier}`,
          get label() {
            return getItemTierGroupName("tier", tier);
          },
          menuPriority: tier,
        };
      }),
    ].map((data) => [data.id, data]),
  );
  return m_itemTierGroups;
}

/**
 * Get the name of given item type group.
 */
function getItemTypeGroupName(id: string) {
  const { t } = useI18n();
  return t(`game-data.items.groups.type.subgroups.${id}.name`);
}

/**
 * Get the name of given item tier group.
 */
function getItemTierGroupName(id: "tutorial"): string;
function getItemTierGroupName(id: "tier", tier: number): string;
function getItemTierGroupName(id: string, tier?: number) {
  const { t } = useI18n();
  return t(`game-data.items.groups.tier.subgroups.${id}.name`, { tier });
}
