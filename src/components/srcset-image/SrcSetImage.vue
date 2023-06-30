<script setup lang="ts">
export type ImageSrc = {
  src: string;
  srcset: string;
};

const props = defineProps<{
  src: Readonly<ImageSrc> | ReadonlyArray<Readonly<ImageSrc>> | null;
}>();

const images = computed(() => props.src === null ? [] : Array.isArray(props.src) ? props.src : [props.src]);
const imageCount = computed(() => images.value.length);
</script>

<template>
  <div v-if="imageCount === 0"></div>

  <picture v-else-if="imageCount === 1">
    <source :srcset="images[0].srcset" />
    <img :src="images[0].src" />
  </picture>

  <div v-else class="multi-image">
    <picture v-for="image in images" :key="image">
      <source :srcset="image.srcset" />
      <img :src="image.src" />
    </picture>
  </div>
</template>

<style lang="scss" scoped>
picture {
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    width: inherit;
  }
}

.multi-image {
  position: relative;

  > picture {
    position: absolute;

    --width: 66.66667%;
    top: calc((100% - var(--width)) / 2);
    left: calc((100% - var(--width)) / 2);
    width: var(--width);

    transform: translate(
        calc(cos(var(--rotate)) * (100% - var(--width))),
        calc(sin(var(--rotate)) * (100% - var(--width)))
      );

    @for $i from 1 through 8 {
      &:nth-of-type(#{$i}) {
        --rotate: calc(360deg * #{$i} / #{v-bind(imageCount)});
      }
    }
  }
}
</style>
