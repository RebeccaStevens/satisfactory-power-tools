<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("site.title"),
});
</script>

<template>
  <div>{{ t("pages.home.title") }}</div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
