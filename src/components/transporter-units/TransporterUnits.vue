<script setup lang="ts">
import { pipe, wire, type ItemTransporter } from "~/data/types";

const { t } = useI18n();

const props = defineProps<{
  transporter: ItemTransporter | null;
}>();

const amount = 1000;

const untisLabel = computed(() => {
  return props.transporter === pipe
    ? t(`units.rates.fluid.minute.long`, amount)
    : props.transporter === wire
    ? t(`units.rates.power.long`, amount)
    : t(`units.rates.per.minute.long`, amount)
});
</script>

<template>
  <div :title="untisLabel">
    <template v-if="props.transporter === pipe">
      <math display="inline">
        <mfrac>
          <mrow>
            <msup>
              <ms>m</ms>
              <mn>3</mn>
            </msup>
          </mrow>
          <mrow>
            <ms>
              {{ t(`units.time.minute.short`, amount) }}
            </ms>
          </mrow>
        </mfrac>
      </math>
    </template>

    <template v-else-if="props.transporter === wire">
      <math display="inline">
        <ms> {{ t(`units.rates.power.short`, amount) }} </ms>
      </math>
    </template>

    <template v-else>
      <math display="inline">
        <mfrac>
          <mrow>
            <mn> 1 </mn>
          </mrow>
          <mrow>
            <ms>
              {{ t(`units.time.minute.short`, amount) }}
            </ms>
          </mrow>
        </mfrac>
      </math>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.divide-line {
  border-top: beltUnit currentColor 1px;
}
</style>
