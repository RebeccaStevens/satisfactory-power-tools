<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("site.title"),
});
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
#app {
  container-name: app;
  container-type: size;
  height: 100vh;
}
</style>
