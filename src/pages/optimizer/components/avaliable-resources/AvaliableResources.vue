<script setup lang="ts">
import { useGameDataName, useGameImage, useResourceItemsByName, useResourceItemsMapMaxRates } from "~/composables/game-data";
import { type MegaWatts, type QuantityPerMinute, type GeneralItem, wire } from "~/data/types";

defineExpose({
  setRates
});


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
} = useResourceItemsByName();

const resourceItems = [
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
];
const resourceItemsMapMaxRates = useResourceItemsMapMaxRates();
const rates = new WeakMap<Readonly<GeneralItem>, {
  amount: QuantityPerMinute,
  power: MegaWatts
}>(
  resourceItemsMapMaxRates.effective.entries().map(([item, rate]) => [item, reactive({
    amount: rate.amount,
    power: rate.power,
  })] as const)
);

export type ResourceItemRates = Readonly<ReadonlyMap<Readonly<GeneralItem>, {
  amount: QuantityPerMinute,
  power: MegaWatts
}>>;

function setRates(newRates: ResourceItemRates) {
  for (const [item, rateValue] of newRates.entries()) {
    const rate = rates.get(item);
    if (rate !== undefined) {
      rate.amount = rateValue.amount;
      rate.power = rateValue.power;
    }
  }
}
</script>

<template>
  <q-scroll-area class="h-full">
    <q-list>
      <q-item v-for="item in resourceItems" :key="item.id" class="py-0">
        <q-item-section avatar>
          <SrcSetImage
            :src="useGameImage(item.icon)"
            class="aspect-square w-8"
            aria-hidden="true"
          />
        </q-item-section>

        <q-item-section class="flex-basis-auto">
          <q-item-label> {{ useGameDataName(item) }} </q-item-label>
        </q-item-section>

        <q-item-section
          class="flex-basis-auto flex-grow-0 flex flex-row no-wrap"
        >
          <q-input
            v-model.number="rates.get(item)!.amount"
            type="number"
            borderless
            filled
            dense
            min="0"
            class="mr-2 flex-basis-50"
            input-class="text-right w-10ch text-base"
          >
            <template v-slot:append>
              <q-item-section class="flex-basis-1/2 flex-grow-0">
                <TransporterUnits
                  :transporter="item.transporter"
                  class="normal-case text-base w-3ch"
                />
              </q-item-section>
            </template>
          </q-input>

          <q-input
            v-model.number="rates.get(item)!.power"
            type="number"
            borderless
            filled
            dense
            min="0"
            step="any"
            class="flex-basis-50"
            input-class="text-right w-10ch text-base"
          >
            <template v-slot:append>
              <q-item-section class="flex-basis-1/2 flex-grow-0">
                <TransporterUnits
                  :transporter="wire"
                  class="normal-case text-base w-3ch"
                />
              </q-item-section>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<style lang="scss" scoped>
.q-item {
  &:has(:focus) {
    background-color: var(--background-highlight);
  }
}
</style>
