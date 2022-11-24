<script setup lang="ts">
import { usePageTitle } from "~/composables/page";

const { t } = useI18n();

useHead({
  title: usePageTitle("home"),
});
</script>

<template>
  <div>{{ t("pages.home.title") }}</div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
