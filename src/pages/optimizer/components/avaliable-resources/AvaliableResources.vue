<script setup lang="ts">
import { type ResourceItemRateValue} from "~/composables/game-data";
import { useGameDataName, useGameImage } from "~/composables/game-data";
import { wire } from "~/data/types";

defineProps<{
  rates: ReadonlyArray<ResourceItemRateValue>;
}>();
</script>

<template>
  <q-scroll-area class="h-full">
    <q-list>
      <q-item v-for="value in rates" :key="value.item.id" class="py-0">
        <q-item-section avatar>
          <SrcSetImage
            :src="useGameImage(value.item.icon)"
            class="aspect-square w-8"
            aria-hidden="true"
          />
        </q-item-section>

        <q-item-section class="flex-basis-auto">
          <q-item-label> {{ useGameDataName(value.item) }} </q-item-label>
        </q-item-section>

        <q-item-section
          class="flex-basis-auto flex-grow-0 flex flex-row no-wrap"
        >
          <q-input
            v-model.number="value.amount"
            type="number"
            borderless
            filled
            dense
            min="0"
            class="mr-2 flex-basis-50"
            input-class="text-right w-10ch text-base"
          >
            <template #append>
              <q-item-section class="flex-basis-1/2 flex-grow-0">
                <TransporterUnits
                  :transporter="value.item.transporter"
                  class="normal-case text-base w-3ch"
                />
              </q-item-section>
            </template>
          </q-input>

          <q-input
            v-model.number="value.power"
            type="number"
            borderless
            filled
            dense
            min="0"
            step="any"
            class="flex-basis-50"
            input-class="text-right w-10ch text-base"
          >
            <template #append>
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
