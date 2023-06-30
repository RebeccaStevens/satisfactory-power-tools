<script setup lang="ts">
import { assert } from "chai";
import { ref, nextTick, reactive } from "vue";

import { useOptimizableItems, useGameDataName, useGameImage } from "~/composables/game-data";
import { energy } from "~/data/special-items";

const props = defineProps<{
  exclude: OptimizableItem | null;
}>();

const { t } = useI18n();

const optimizableItems = useOptimizableItems();
type OptimizableItem = (typeof optimizableItems)[number];

const itemModel = ref<Readonly<OptimizableItem> | null>(null);
const items = ref(new Map<string, Readonly<OptimizableItem>>());
const amounts = new Map<string, {
  greaterThan: boolean;
  amount: number;
}>();

addItem(energy, 10_000);

watch(itemModel, (value) => {
  if (value !== null) {
    addItem(value);
    clearInput();
  }
});

watchEffect(() => {
  if (props.exclude !== null) {
    removeItem(reactive(props.exclude));
  }
});

function addItem(item: Readonly<OptimizableItem>, amount?: number) {
  items.value.set(item.id, item);

  const current = amounts.get(item.id);
  if (current === undefined) {
    amounts.set(item.id, reactive({
      greaterThan: true,
      amount: amount ?? 0
    }));
  } else if (amount !== undefined) {
    current.amount = amount;
  }
}

function onAddItemEvent() {
  if (itemModel.value === null) {
    return;
  }

  addItem(itemModel.value);
  clearInput();
}

function clearInput() {
  void nextTick().then(() => {
    itemModel.value = null;
  });
}

function removeItem(item: Readonly<OptimizableItem>) {
  items.value.delete(item.id);
}

function getAmountsRef(item: Readonly<OptimizableItem>) {
  const amount = amounts.get(item.id);
  assert(amount !== undefined);
  return amount;
}

function isNotSelectableItem(item: Readonly<OptimizableItem>): boolean {
  const asReactive = reactive(item);
  return props.exclude === asReactive || items.value.has(item.id);
}
</script>

<template>
  <div class="flex flex-col no-wrap">
    <q-scroll-area class="h-full flex-grow">
      <ListBox :items="items.values()">
        <template v-slot:item="slotProps">
          <q-item class="py-0 pr-2">
            <q-item-section avatar>
              <SrcSetImage
                :src="useGameImage(slotProps.item.icon)"
                class="aspect-square w-8"
                aria-hidden="true"
              />
            </q-item-section>

            <q-item-section class="flex-basis-1/2">
              <q-item-label>
                {{ useGameDataName(slotProps.item) }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              class="flex-basis-1/2 flex-grow-0 flex-row flex-nowrap items-center"
            >
              <q-btn
                class="p-0 mr-2 aspect-square text-xl amount-restriction"
                :class="{ gte: getAmountsRef(slotProps.item).greaterThan }"
                flat
                rounded
                @click="getAmountsRef(slotProps.item).greaterThan = !getAmountsRef(slotProps.item).greaterThan"
              >
                <span
                  v-if="getAmountsRef(slotProps.item)?.greaterThan"
                  :title="t('data.compare.>=')"
                >
                  ≥
                </span>
                <span v-else :title="t('data.compare.<=')"> ≤ </span>
              </q-btn>
              <q-input
                v-model.number="getAmountsRef(slotProps.item).amount"
                type="number"
                borderless
                filled
                dense
                min="0"
                input-class="text-right text-base"
              >
                <template v-slot:append>
                  <TransporterUnits
                    :transporter="slotProps.item.transporter"
                    class="normal-case text-base w-3ch"
                  />
                </template>
              </q-input>
            </q-item-section>

            <q-item-section class="flex-none">
              <q-btn
                round
                flat
                icon="i-carbon-close"
                :title="t('actions.remove.title.with-context', { item: useGameDataName(slotProps.item) })"
                @click="removeItem(slotProps.item)"
              />
            </q-item-section>
          </q-item>
        </template>
      </ListBox>
    </q-scroll-area>

    <q-form class="flex pt-1 px-4" @submit="onAddItemEvent">
      <ItemSelector
        sort-by="type"
        class="flex-grow"
        v-model="itemModel"
        :items="optimizableItems"
        :isDisabledItem="isNotSelectableItem"
        dense
      />
      <span w-4></span>
      <q-btn
        round
        color="primary"
        icon="i-carbon-add"
        :title="itemModel === null ? t('actions.add.title.basic') : t('actions.add.title.with-context', { item: useGameDataName(itemModel) })"
        type="submit"
        class="self-center add"
        :disable="itemModel === null"
      />
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.q-btn {
  min-width: 40px;
  min-height: 40px;
}

.amount-restriction {
  border: solid 0.125rem;
  border-color: var(--q-negative);

  &.gte {
    border-color: var(--q-positive);
  }
}
</style>
