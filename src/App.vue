<script setup lang="ts">
import { useQuasar } from "quasar";

const $q = useQuasar();
const { t } = useI18n();

useHead({
  title: t("site.title"),
});

// Setup using icons classes
$q.iconMapFn = (iconName) => {
  if (iconName.startsWith("i-") === true) {
    return {
      cls: iconName,
    };
  }
};

// Setup detection of dark mode.
$q.dark.set(document.documentElement.classList.contains("dark"));
watch(
  () => $q.dark.isActive,
  (value) => {
    document.documentElement.classList.toggle("dark", value);
  },
);
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
