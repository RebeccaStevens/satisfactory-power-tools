<script setup lang="ts">
import { assert } from "chai";
import { QInput, QTree } from "quasar";
import { ref } from "vue";

import { useAutomatableAppliedRecipes, getAppliedRecipeName, getAppliedRecipeIcons, useGameDataName, useGameImage, useSinkAppliedRecipes } from "~/composables/game-data";
import  { type Percentage , type Machine , type AppliedRecipe } from "~/data/types";
import { overclock_icon } from "~/images/game-data/ui"

const { t } = useI18n();

defineExpose({
  getValues,
});

type TreeGroup = Readonly<{
  id: string;
  label: string;
  header: string;
  machine: Machine;
  children: Array<{
    id: string;
    label: string;
    header: string;
    appliedRecipe: AppliedRecipe;
    clockSpeed: Ref<Percentage>;
  }>
}>

const appliedRecipes = [
  ...useAutomatableAppliedRecipes(),
  ...useSinkAppliedRecipes(),
];

const ticked = ref<string[]>([]);
const expanded = ref<string[]>([]);
const filter = ref<string>('');

const filterRef = ref<InstanceType<typeof QInput> | null>(null);
const treeRef = ref<InstanceType<typeof QTree> | null>(null);

const appliedRecipesData = (() => {
  const groups = new Map<string, TreeGroup>();

  for (const appliedRecipe of appliedRecipes.values()) {
    const machine = appliedRecipe.producedIn;
    const group = getGroup(machine);
    group.children.push({
      id: appliedRecipe.id,
      header: "applied-recipe",
      get label() {
        return getAppliedRecipeName(appliedRecipe);
      },
      appliedRecipe,
      clockSpeed: ref(100 as Percentage),
    });

    ticked.value.push(appliedRecipe.id);
  }

  return [...groups.values()];

  function getGroup(machine: Machine): TreeGroup {
    const group = groups.get(machine.id);

    if (group !== undefined) {
      return group;
    }

    const newGroup = {
      id: machine.id,
      header: "machine",
      machine,
      get label() {
        return useGameDataName(machine);
      },
      children: [],
    };
    groups.set(machine.id, newGroup);
    return newGroup;
  }
})();

watch(
  () => filter.value === "",
  (value, prevValue) => {
    assert(treeRef.value !== null);
    if (prevValue === true) {
      assert(value === false);
      treeRef.value.expandAll();
    } else {
      assert(value === true);
      treeRef.value.collapseAll();
    }
  }
);

function resetFilter() {
  filter.value = '';
  assert(filterRef.value !== null);
  filterRef.value.focus();
}

function getValues() {
  const tickedMap = new Set(ticked.value);
  return appliedRecipesData.flatMap((group) =>
    group.children.filter((data) =>
      tickedMap.has(data.id)).map((data) => ({
        appliedRecipe: data.appliedRecipe,
        clockSpeed: data.clockSpeed.value,
      }))
  );
}
</script>

<template>
  <q-card>
    <q-card-section class="flex flex-row">
      <slot name="header-start"></slot>

      <q-input
        ref="filterRef"
        v-model="filter"
        filled
        label="Filter"
        dense
        class="flex-basis-1/2 flex-grow"
      >
        <template #append>
          <q-icon
            v-if="filter !== ''"
            name="i-carbon-close-filled"
            class="cursor-pointer"
            @click="resetFilter"
          />
        </template>
      </q-input>

      <slot name="header-end"></slot>
    </q-card-section>
    <q-card-section
      class="px-0 pt-0 flex-grow card-content flex flex-col no-wrap h-full"
    >
      <q-scroll-area class="h-full">
        <q-tree
          ref="treeRef"
          v-model:ticked="ticked"
          v-model:expanded="expanded"
          :nodes="appliedRecipesData"
          :filter="filter"
          :duration="0"
          class="px-4"
          node-key="id"
          tick-strategy="leaf"
        >
          <template #header-machine="prop">
            <div class="flex flex-row items-center h-10">
              <SrcSetImage
                :src="useGameImage(prop.node.machine.building.icon)"
                class="aspect-square w-8 mx-2"
                aria-hidden="true"
              />
              <span class="flex-grow">
                {{ prop.node.label }}
              </span>
            </div>
          </template>

          <template #header-applied-recipe="prop">
            <div class="flex flex-row items-center w-full h-10">
              <div
                class="flex flex-row flex-basis-auto flex-grow"
                @click="prop.ticked = !prop.ticked"
              >
                <SrcSetImage
                  :src="getAppliedRecipeIcons(prop.node.appliedRecipe)"
                  class="aspect-square w-8 mx-2"
                  aria-hidden="true"
                />
                <span class="flex-grow">
                  {{ prop.node.label }}
                </span>
              </div>
              <div
                class="flex flex-row no-wrap items-center flex-basis-100"
                :title="t('game-data.machines.settings.clock-speed.label')"
              >
                <SrcSetImage
                  :src="overclock_icon"
                  class="aspect-square w-8 flex-shrink-0"
                />
                <q-slider
                  v-model="prop.node.clockSpeed.value"
                  :inner-min="1"
                  :label-value="t('game-data.machines.settings.clock-speed.value', {value: prop.node.clockSpeed.value})"
                  :markers="50"
                  :max="250"
                  :min="0"
                  :step="5"
                  class="ml-4"
                  dense
                  label
                  snap
                />
                <q-input
                  v-model.number="prop.node.clockSpeed.value"
                  type="number"
                  :max="250"
                  :min="1"
                  class="ml-4"
                  dense
                  filled
                  input-class="text-right w-10ch"
                >
                  <template #append>
                    <span class="text-base">%</span>
                  </template>
                </q-input>
              </div>
            </div>
          </template>
        </q-tree>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.q-tree:deep(.q-icon.q-tree__arrow) {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
