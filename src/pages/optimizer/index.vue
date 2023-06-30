<script setup lang="ts">
import { assert } from "chai";

import { useOptimizableItems, useResourceItems, useResourceItemsMapMaxRates } from "~/composables/game-data";
import { usePageTitle } from "~/composables/page";
import { points } from "~/data/special-items";

import AvaliableResources from "./components/avaliable-resources/AvaliableResources.vue";
import { type ResourceItemRates } from "./components/avaliable-resources/AvaliableResources.vue";

useHead({
  title: usePageTitle("optimizer"),
});
const { t } = useI18n();

const AvaliableResourcesRef = ref<InstanceType<typeof AvaliableResources> | null>(null);

const optimizableItems = useOptimizableItems();
const resourceItems = useResourceItems();
const resourceCount = resourceItems.length;
const resourceItemsMapMaxRates = useResourceItemsMapMaxRates();

const optimizeFor = ref<(typeof optimizableItems)[number] | null>(points);

function setResourceRatesRates(rates: ResourceItemRates) {
  assert(AvaliableResourcesRef.value !== null);
  AvaliableResourcesRef.value.setRates(rates);
}

const helpOpen = ref(false);
const helpContent = ref({header: "loading...", content: "loading..."});
function showHelp(helpI18nPath: string) {
  helpContent.value.header = t(`${helpI18nPath}.header`);
  helpContent.value.content = t(`${helpI18nPath}.content`);
  helpOpen.value = true;
}

function optimize() {
  // TODO: implement
}
</script>

<template>
  <q-form class="grid grid-cols-2 gap-4 mx-auto max-w-7xl" @submit="optimize">
    <q-card class="optimize-for-card col-span-2 w-full max-w-4xl">
      <q-card-section class="flex flex-row">
        <ItemSelector
          v-model="optimizeFor"
          :items="optimizableItems"
          :label="t('pages.optimizer.content.for.label')"
          sort-by="points"
          class="flex-1"
        />
        <q-btn
          color="info"
          icon="i-carbon-information"
          rounded
          :title="t('actions.help.title')"
          class="info"
          @click="showHelp('pages.optimizer.content.for.help')"
        />
      </q-card-section>
    </q-card>

    <q-card class="flex flex-col excess-card">
      <q-card-section class="flex flex-row">
        <h2 class="flex-1">
          {{ t("pages.optimizer.content.excess.header") }}
        </h2>
        <q-btn
          color="info"
          icon="i-carbon-information"
          rounded
          :title="t('actions.help.title')"
          class="info"
          @click="showHelp('pages.optimizer.content.excess.help')"
        />
      </q-card-section>
      <q-card-section class="px-0 pt-0 flex-grow">
        <ExcessProduction :exclude="optimizeFor" class="h-full" />
      </q-card-section>
    </q-card>

    <q-card class="resize-y overflow-hidden resources-card">
      <q-card-section class="flex flex-row">
        <h2 class="flex-1">
          {{ t("pages.optimizer.content.resources.header") }}
        </h2>
        <q-btn-dropdown
          color="secondary"
          :label="t('pages.optimizer.content.resources.action.label')"
          content-class="actions"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="setResourceRatesRates(resourceItemsMapMaxRates.effective)"
            >
              <q-item-section>
                <q-item-label>
                  {{ t("pages.optimizer.content.resources.action.options.effective-map-max.label") }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="setResourceRatesRates(resourceItemsMapMaxRates.full)"
            >
              <q-item-section>
                <q-item-label>
                  {{ t("pages.optimizer.content.resources.action.options.full-map-max.label") }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          color="info"
          icon="i-carbon-information"
          rounded
          :title="t('actions.help.title')"
          class="info"
          @click="showHelp('pages.optimizer.content.resources.help')"
        />
      </q-card-section>
      <q-card-section class="px-0 pt-0 card-content">
        <AvaliableResources ref="AvaliableResourcesRef" />
      </q-card-section>
    </q-card>

    <AppliedRecipeSettings
      class="recipe-card resize-y overflow-hidden col-span-2"
    >
      <template v-slot:header-start>
        <h2 class="flex-basis-1/4">
          {{ t("pages.optimizer.content.recipes.header") }}
        </h2>
      </template>
      <template v-slot:header-end>
        <div class="flex-basis-1/4 flex flex-row justify-end">
          <q-btn
            color="info"
            icon="i-carbon-information"
            rounded
            :title="t('actions.help.title')"
            class="info"
            @click="showHelp('pages.optimizer.content.recipes.help')"
          />
        </div>
      </template>
    </AppliedRecipeSettings>

    <q-btn
      color="primary"
      type="submit"
      class="col-span-2 self-center justify-self-center text-xl capitalize px-15 min-w-1/3"
    >
      {{ t("pages.optimizer.content.calculate.value") }}
    </q-btn>
  </q-form>

  <q-dialog v-model="helpOpen">
    <q-card class="help-card">
      <q-card-section class="row items-center">
        <h2>{{ helpContent.header }}</h2>
      </q-card-section>
      <q-card-section class="row items-center">
        {{ helpContent.content }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
$header-height: 60px;
$item-height: 48px;
$card-padding: 16px;

.q-card__section:has(> h2) {
  min-height: $header-height;
  padding-block-end: 0.5rem;
}

h2 {
  font-size: larger;
  line-height: 2rem;
  text-transform: capitalize;
}

.optimize-for-card {
  justify-self: center;
}

.q-card {
  .card-content {
    height: calc(100% - #{$header-height});
  }
}

.resources-card {
  height: 8.5 * $item-height + $header-height + $card-padding;
  min-height: 4 * $item-height + $header-height + $card-padding;
  max-height: calc(v-bind(resourceCount) * #{$item-height} + #{$header-height + $card-padding});
}

.recipe-card {
  height: 8 * $item-height + $header-height + $card-padding;
  min-height: 3 * $item-height + $header-height + $card-padding;
  max-height: calc(100cqh - #{2 * $header-height});
}

.actions .q-item {
  text-transform: none;
}

.q-btn.info {
  $size: 1.33rem;
  margin-inline-start: 0.5rem;
  padding: 0;
  width: $size;
  height: $size;
  min-height: unset;
  align-self: flex-start;

  &:deep(.q-icon) {
    margin-top: -$size * 0.1;
    width: $size * 1.2;
    height: $size * 1.2;
  }

  .optimize-for-card & {
    margin-inline-start: 1rem;
  }
}


.help-card {
  max-width: min(50rem, 90cqw);
  width: 90cqw;

  h2 {
    font-size: x-large;
  }
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
