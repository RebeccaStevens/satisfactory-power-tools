<script setup lang="ts">
import { usePageTitle } from "~/composables/page";

const { t } = useI18n();

useHead({
  title: usePageTitle("optimizer"),
});
</script>

<template>
  <div>{{ t("pages.optimizer.title") }}</div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
