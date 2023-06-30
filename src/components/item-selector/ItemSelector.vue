<script setup lang="ts">
import { QSelect } from "quasar";
import { type QSelectProps } from "quasar";
import { ref } from "vue";

import { type ItemGroup} from "~/composables/game-data";
import { useGameDataName,
  useGameImage,
  useEntitySorterByName,
  useDisplayableSorter,
  useItemSorterByPoints,
  useItemSorterByTransporter,
  useItemTierGroups,
  useItemTypeGroups
} from "~/composables/game-data";
import { useIntlNumberFormatter } from "~/composables/intl";
import { gameData } from "~/data";
import { type GeneralItem, type Item, isGeneralItem } from "~/data/types";
import { assertNever } from "~/utils";

const { t } = useI18n();
const numberFormatter = useIntlNumberFormatter();
const itemTypeGroups = useItemTypeGroups();
const itemTierGroups = useItemTierGroups();

const props = defineProps<{
  label?: string;
  sortBy?: SortOption;
  dense?: boolean;
  items?: ReadonlyArray<Readonly<Item>>;
  modelValue?: Readonly<Item> | null;
  isDisabledItem?: (item: Readonly<Item>) => boolean;
}>();

const emit = defineEmits(['update:modelValue']);

type SortOption = typeof sortOptions[number]["value"];

type GroupOfItems = readonly [ItemGroup | null, ReadonlyArray<Readonly<Item>>];

const sortOptions = [
  { get label() { return getSortOptionName(this.value) }, value: "name" as const },
  { get label() { return getSortOptionName(this.value) }, value: "type" as const },
  { get label() { return getSortOptionName(this.value) }, value: "tier" as const },
  { get label() { return getSortOptionName(this.value) }, value: "points" as const },
];

function getSortOptionName(value: string) {
  return t(`game-data.items.groups.${value}.name`);
}

function getItemsGroupedByType(items: ReadonlyArray<Item>) {
  return items.groupToMap(
    (item) =>
      itemTypeGroups.get(isGeneralItem(item) ? item.typeId : 'special') ?? null,
  );
}

function getItemsGroupedByTier(items: ReadonlyArray<Item>) {
  return(items).groupToMap((item) => {
    const typedItem = item as { tier?: GeneralItem['tier'] };
    return typedItem.tier === null || typedItem.tier === undefined
      ? null
      : itemTierGroups.get(`tier${typedItem.tier}`) ?? null;
  });
}

function getOptionsFilter(input: string) {
  return (items: Readonly<Item[]>) =>
    items.filter((item: Readonly<Item>) =>
      useGameDataName(item).toLowerCase().includes(input),
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

const baseItems:  ReadonlyArray<Readonly<Item>> = props.items ?? [...gameData.items.values()];
let m_itemsByName: ReadonlyArray<Readonly<Item>> | undefined = undefined;
let m_itemsByType: GroupOfItems[] | undefined = undefined;
let m_itemsByTier: GroupOfItems[] | undefined = undefined;
let m_itemsByPoints: ReadonlyArray<Readonly<Item>> | undefined = undefined;

const textInput = ref("");
const itemModel = ref<Item | null>(props.modelValue ?? null);
const sortModel = ref<SortOption>(props.sortBy ?? "type");

if (props.modelValue !== undefined) {
  watchEffect(() => {
    emit("update:modelValue", itemModel.value);
  });
  watchEffect(() => {
    itemModel.value = props.modelValue ?? null;
  });
}

const itemOptions = computed(() => {
  switch (sortModel.value) {
    case "name": {
      if (m_itemsByName === undefined) {
        m_itemsByName = [...baseItems].sort(useEntitySorterByName);
      }
      return getOptionsFilter(textInput.value)(m_itemsByName);
    }

    case "type": {
      if (m_itemsByType === undefined) {
        m_itemsByType = [
          ...getItemsGroupedByType(baseItems)
            .entries()
            .map(
              ([group, items]): GroupOfItems => [
                group,
                items.sort(group?.id === "ore"
                  ? useItemSorterByTransporter
                  : useDisplayableSorter
                ),
              ],
            ),
        ].sort(([a], [b]) =>
          (a?.menuPriority ?? Number.POSITIVE_INFINITY) >
            (b?.menuPriority ?? Number.POSITIVE_INFINITY)
            ? 1
            : -1,
        );
      }
      return getGroupedOptionsFilter(textInput.value)(m_itemsByType);
    }

    case "tier": {
      if (m_itemsByTier === undefined) {
        m_itemsByTier = [
          ...getItemsGroupedByTier(baseItems)
            .entries()
            .map(
              ([group, items]): GroupOfItems => [
                group,
                items.sort(useDisplayableSorter),
              ],
            ),
        ].sort(([a], [b]) =>
          (a?.menuPriority ?? Number.POSITIVE_INFINITY) >
            (b?.menuPriority ?? Number.POSITIVE_INFINITY)
            ? 1
            : -1,
        );
      }
      return getGroupedOptionsFilter(textInput.value)(m_itemsByTier);
    }

    case "points": {
      if (m_itemsByPoints === undefined) {
        m_itemsByPoints = [...baseItems].sort(useItemSorterByPoints);
      }
      return getOptionsFilter(textInput.value)(m_itemsByPoints);
    }

    default: {
      return assertNever("Unhandled sort");
    }
  }
});

// TODO: refactor to us a simpler event.
const onFilter: QSelectProps["onFilter"] = (input, update) => {
  update(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => { },
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
</script>

<template>
  <q-select
    filled
    clearable
    v-model="itemModel"
    :use-input="itemModel === null"
    :label="props.label"
    :dense="props.dense"
    :options="itemOptions"
    @filter="onFilter"
    @input-value="onInput"
    class="w-[45ch]"
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
      <q-item
        v-if="itemModel !== null"
        :dense="props.dense"
        class="selected-item pl-0"
      >
        <q-item-section avatar>
          <SrcSetImage
            :src="useGameImage(itemModel.icon)"
            class="img aspect-square"
            aria-hidden="true"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ useGameDataName(itemModel) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          <q-item-label>
            {{ t("components.search.no-results") }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="data">
      <div
        :key="Array.isArray(data.opt) ? `group:${data.opt[0]?.id ?? 'uncategorized'}` : `value:${data.opt.id}`"
      >
        <!-- Grouped -->
        <template v-if="Array.isArray(data.opt)">
          <q-expansion-item
            default-opened
            :label="data.opt[0]?.label ?? t('data.categories.no-category')"
          >
            <template v-for="option in data.opt[1]" :key="option.id">
              <q-item
                clickable
                v-ripple
                v-close-popup
                :active="itemModel?.id === option.id"
                :disable="props.isDisabledItem?.(option) ?? false"
                @click="itemModel = option"
              >
                <q-item-section avatar>
                  <SrcSetImage
                    :src="useGameImage(option.icon)"
                    class="aspect-square w-8"
                    aria-hidden="true"
                  />
                </q-item-section>
                <q-item-section flex-basis-full>
                  <q-item-label>
                    {{ useGameDataName(option) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-expansion-item>
        </template>

        <!-- Ungrouped -->
        <template v-else>
          <q-item
            clickable
            v-ripple
            v-close-popup
            :active="itemModel?.id === data.opt.id"
            :disable="props.isDisabledItem?.(data.opt) ?? false"
            @click="itemModel = data.opt"
          >
            <q-item-section avatar>
              <SrcSetImage
                :src="useGameImage(data.opt.icon)"
                class="aspect-square w-8"
                aria-hidden="true"
              />
            </q-item-section>
            <q-item-section flex-basis-full>
              <q-item-label>
                {{ useGameDataName(data.opt) }}
              </q-item-label>
            </q-item-section>
            <q-item-section
              v-if="sortModel === 'points' && data.opt.points !== undefined"
              flex-basis-auto
            >
              <q-item-label>
                {{ numberFormatter.format(data.opt.points) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </div>
    </template>
  </q-select>
</template>

<style lang="scss" scoped>
$icon-width: 2rem;
$dense-icon-width: 1.5rem;

.q-select {
  &.q-field--dense :deep(.q-field__inner) .q-icon {
    width: $dense-icon-width;
  }

  &:not(.q-field--dense) :deep(.q-field__native) {
    height: 48px;
  }

  :deep(.q-field__marginal) {
    align-self: end;
  }

  :deep(.q-field__label) {
    text-transform: capitalize;
  }
}

.selected-item {

  :deep(.q-item__section--avatar) {
    min-width: unset;
  }

  .img {
    width: 2rem;
  }

  .q-field--dense & {
    min-height: 28px;

    .img {
      width: $dense-icon-width;
    }
  }
}
</style>
