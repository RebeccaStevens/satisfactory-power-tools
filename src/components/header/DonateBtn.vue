<script lang="ts" setup>
import { kofi } from "~/images/external";

const { t } = useI18n();
</script>

<template>
  <ABtn>
    <AMenu>
      <iframe
        id="kofiframe"
        src="https://ko-fi.com/rebeccastevens/?hidefeed=true&widget=true&embed=true&preview=true"
        style="border: none; width: 100%; padding: 4px; background: #f9f9f9"
        height="622"
        title="rebeccastevens"
      ></iframe>
    </AMenu>

    <img :srcset="kofi" :alt="t('donate.ko-fi.image-alt')" />
    {{ t("donate.ko-fi.message") }}
  </ABtn>
</template>

<style lang="scss" scoped>
.a-btn {
  text-transform: capitalize;
  background-color: var(--kofi-blue);
}
img {
  height: 100%;
}
</style>
