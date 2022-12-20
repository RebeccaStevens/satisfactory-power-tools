<script lang="ts" setup>
import { kofi } from "~/images/external";

const { t } = useI18n();
</script>

<template>
  <q-btn-dropdown content-class="donate-content">
    <template v-slot:label>
      <picture>
        <source :srcset="kofi.srcset" />
        <img :src="kofi.src" :alt="t('donate.ko-fi.image-alt')" />
      </picture>
      {{ t("donate.ko-fi.message") }}
    </template>

    <iframe
      id="kofiframe"
      src="https://ko-fi.com/rebeccastevens/?hidefeed=true&widget=true&embed=true&preview=true"
      style="border: none; width: 100%; padding: 4px; background: #f9f9f9"
      height="622"
      title="rebeccastevens"
    ></iframe>
  </q-btn-dropdown>
</template>

<style lang="scss" scoped>
.q-btn {
  text-transform: capitalize;
  background-color: var(--kofi-blue);
}

picture {
  aspect-ratio: 1;
  height: 100%;
}

:deep(.q-btn__content) {
  height: 100%;
}
</style>

<style lang="scss">
.donate-content {
  --q-pe-top: #{map-get($space-sm, "y")};
}
</style>
