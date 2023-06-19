<script setup lang="ts">
import { usePageTitle } from "~/composables/page";
import  { type Item } from "~/data/types";

useHead({
  title: usePageTitle("optimizer"),
});

function filterOptimizeFor(item: Item): boolean {
  // TODO: Filter out non-automatable
  return item.typeId !== "ore";
}
</script>

<template>
  <q-form class="grid grid-cols-2 gap-2 mx-auto my-4 max-w-7xl p-8">
    <ItemSelector
      label="Optimize For"
      sort-by="points"
      :filter="filterOptimizeFor"
      class="optimize-for col-span-2 w-full max-w-4xl"
    ></ItemSelector>
    <div>Excess Production</div>
    <div>Resources</div>
    <div class="col-span-2">Recipes</div>
  </q-form>
</template>

<style scoped lang="scss">
.q-form {
  > :not(:first-child) {
    border: solid 1px;
  }
}

.optimize-for {
  justify-self: center;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
