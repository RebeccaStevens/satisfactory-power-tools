<script setup lang="ts">
import { QSelect } from "quasar";
import type { QSelectProps } from "quasar";
import { ref } from "vue";

import { useGameDataName, useGameImage } from "~/composables/game-data";
import { gameData } from "~/data";
import type { Item } from "~/data/types";
import { assertNever } from "~/utils";

type ItemOption = {
  label: string;
  value: string;
  image: {
    srcset: string;
    src: string;
  };
  gameData: Item;
};

type ItemGroup = {
  id: string;
  label: string;
  menuPriority: number;
};

type SortOption = typeof sortOptions[number]["value"];

type GroupOfItems = [ItemGroup | null, ItemOption[]];

// eslint-disable-next-line unicorn/no-useless-spread -- @see https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2018
const allOptions = [
  ...gameData.items.values().map(
    (item): ItemOption => ({
      label: useGameDataName(item),
      value: item.id,
      image: useGameImage(item.icon),
      gameData: item,
    }),
  ),
];

const itemTypeGroups = new Map<string, ItemGroup>(
  (
    [
      { id: "alien", label: "Alien", menuPriority: 4 },
      { id: "ammo", label: "Ammo", menuPriority: 12 },
      { id: "communication", label: "Communications", menuPriority: 9 },
      { id: "consume", label: "Consumables", menuPriority: 11 },
      { id: "container", label: "Containers", menuPriority: 10 },
      { id: "electronic", label: "Electronics", menuPriority: 8 },
      { id: "elevator", label: "Space Elevator Parts", menuPriority: 14 },
      { id: "fluid", label: "Fluids", menuPriority: 5 },
      { id: "industrial", label: "Industrial Parts", menuPriority: 7 },
      { id: "ingot", label: "Ingots", menuPriority: 2 },
      { id: "mineral", label: "Minerals", menuPriority: 3 },
      { id: "nuclear", label: "Nuclear", menuPriority: 13 },
      { id: "ore", label: "Resources", menuPriority: 1 },
      { id: "packaged", label: "Packaged Fluids", menuPriority: 5.1 },
      { id: "special", label: "Special", menuPriority: 15 },
      { id: "standard", label: "Standard Parts", menuPriority: 6 },
      { id: "equip", label: "Equipment", menuPriority: 20 },
      { id: "xmas", label: "Ficsmas", menuPriority: 99 },
    ] as ItemGroup[]
  ).map((data) => [data.id, data]),
);

const itemTierGroups = new Map<string, ItemGroup>(
  (
    [
      { id: "tier0", label: "Tutorial", menuPriority: 0 },
      { id: "tier1", label: "Tier 1", menuPriority: 1 },
      { id: "tier2", label: "Tier 2", menuPriority: 2 },
      { id: "tier3", label: "Tier 3", menuPriority: 3 },
      { id: "tier4", label: "Tier 4", menuPriority: 4 },
      { id: "tier5", label: "Tier 5", menuPriority: 5 },
      { id: "tier6", label: "Tier 6", menuPriority: 6 },
      { id: "tier7", label: "Tier 7", menuPriority: 7 },
      { id: "tier8", label: "Tier 8", menuPriority: 8 },
    ] as ItemGroup[]
  ).map((data) => [data.id, data]),
);

const sortOptions = [
  { label: "Name", value: "name" as const },
  { label: "Type", value: "type" as const },
  { label: "Tier", value: "tier" as const },
];

function getItemsGroupedByType(items: ReadonlyArray<ItemOption>) {
  return items.groupToMap(
    (item) => itemTypeGroups.get(item.gameData.typeId) ?? null,
  );
}

function getItemsGroupedByTier(items: ReadonlyArray<ItemOption>) {
  return items.groupToMap((item) =>
    item.gameData.tier === null
      ? null
      : itemTierGroups.get(`tier${item.gameData.tier}`) ?? null,
  );
}

function getOptionsFilter(input: string) {
  return (items: Readonly<ItemOption[]>) =>
    items.filter((item: Readonly<ItemOption>) =>
      item.label.toLowerCase().includes(input),
    );
}

function getGroupedOptionsFilter(input: string) {
  return (groups: Readonly<GroupOfItems[]>): GroupOfItems[] => {
    const filter = getOptionsFilter(input);
    return groups
      .map(([group, items]: Readonly<GroupOfItems>): GroupOfItems => {
        return [group, filter(items)];
      })
      .filter(([group, items]) => items.length > 0);
  };
}

const baseItems = ref<ItemOption[]>(allOptions);
const itemsByName = ref<ItemOption[]>();
const itemsByType = ref<GroupOfItems[]>();
const itemsByTier = ref<GroupOfItems[]>();

const textInput = ref("");
const itemModel = ref<ItemOption | null>(null);
const sortModel = ref<SortOption>("type");

const itemOptions = computed(() => {
  switch (sortModel.value) {
    case "name": {
      if (itemsByName.value === undefined) {
        itemsByName.value = baseItems.value.sort((a, b) =>
          a.label.localeCompare(b.label),
        );
      }
      return getOptionsFilter(textInput.value)(itemsByName.value);
    }

    case "type": {
      if (itemsByType.value === undefined) {
        itemsByType.value = [
          ...getItemsGroupedByType(baseItems.value)
            .entries()
            .map(
              ([group, items]): GroupOfItems => [
                group,
                items.sort((a, b) => a.label.localeCompare(b.label)),
              ],
            ),
        ].sort(([a], [b]) =>
          (a?.menuPriority ?? Number.POSITIVE_INFINITY) >
          (b?.menuPriority ?? Number.POSITIVE_INFINITY)
            ? 1
            : -1,
        );
      }
      return getGroupedOptionsFilter(textInput.value)(itemsByType.value);
    }

    case "tier": {
      if (itemsByTier.value === undefined) {
        itemsByTier.value = [
          ...getItemsGroupedByTier(baseItems.value)
            .entries()
            .map(
              ([group, items]): GroupOfItems => [
                group,
                items.sort((a, b) => a.label.localeCompare(b.label)),
              ],
            ),
        ].sort(([a], [b]) =>
          (a?.menuPriority ?? Number.POSITIVE_INFINITY) >
          (b?.menuPriority ?? Number.POSITIVE_INFINITY)
            ? 1
            : -1,
        );
      }
      return getGroupedOptionsFilter(textInput.value)(itemsByTier.value);
    }
  }

  assertNever("Unhandled sort");
});

// TODO: refactor to us a simpler event.
const onFilter: QSelectProps["onFilter"] = (input, update) => {
  update(
    () => {},
    (qSelect) => {
      if (input !== "" && (qSelect.options?.length ?? 0) > 0) {
        qSelect.setOptionIndex(-1);
        qSelect.moveOptionSelection(1, true);
      }
    },
  );
};

const onInput: QSelectProps["onInputValue"] = (value: string) => {
  textInput.value = value;
};

const props = defineProps<{ label?: string }>();
</script>

<template>
  <q-select
    filled
    clearable
    v-model="itemModel"
    :use-input="itemModel === null"
    :label="props.label"
    :options="itemOptions"
    input-debounce="0"
    @filter="onFilter"
    @input-value="onInput"
  >
    <template v-slot:before-options>
      <div class="flex items-center">
        <label ml-xs>Sort by:</label>
        <span class="grow"></span>
        <q-btn-toggle
          v-model="sortModel"
          toggle-color="primary"
          class="rounded-none no-shadow"
          :options="sortOptions"
        />
      </div>
      <q-separator />
    </template>

    <template v-slot:selected>
      <q-item v-if="itemModel">
        <q-item-section avatar>
          <picture class="item-image" aria-hidden="true">
            <source :srcset="itemModel.image.srcset" />
            <img :src="itemModel.image.src" />
          </picture>
        </q-item-section>
        <q-item-section>
          {{ itemModel.label }}
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">No results</q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <!-- Grouped -->
      <template v-if="Array.isArray(scope.opt)">
        <q-expansion-item
          default-opened
          :label="scope.opt[0]?.label ?? 'Uncategorized'"
        >
          <template v-for="option in scope.opt[1]" :key="option.value">
            <q-item
              clickable
              v-ripple
              v-close-popup
              @click="itemModel = option"
            >
              <q-item-section avatar>
                <picture class="item-image" aria-hidden="true">
                  <source :srcset="option.image.srcset" />
                  <img :src="option.image.src" />
                </picture>
              </q-item-section>
              <q-item-section>
                {{ option.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-expansion-item>
      </template>

      <!-- Ungrouped -->
      <template v-else>
        <q-item clickable v-ripple v-close-popup @click="itemModel = scope.opt">
          <q-item-section avatar>
            <picture class="item-image" aria-hidden="true">
              <source :srcset="scope.opt.image.srcset" />
              <img :src="scope.opt.image.src" />
            </picture>
          </q-item-section>
          <q-item-section>
            {{ scope.opt.label }}
          </q-item-section>
        </q-item>
      </template>
    </template>
  </q-select>
</template>

<style lang="scss" scoped>
.q-select {
  width: 45ch;
  & :deep(.q-field__native) {
    height: 48px;
  }
  & :deep(.q-field__marginal) {
    align-self: end;
  }
}

.item-image {
  aspect-ratio: 1;
  width: 2rem;
}
</style>
