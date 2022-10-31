<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("site.title"),
});
</script>

<template>
  <RouterView />
</template>
