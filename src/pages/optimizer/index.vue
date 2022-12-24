<script setup lang="ts">
import { usePageTitle } from "~/composables/page";

useHead({
  title: usePageTitle("optimizer"),
});
</script>

<template>
  <ItemSelector label="Optimize For"></ItemSelector>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
