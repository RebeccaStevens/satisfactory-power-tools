<script setup lang="ts" generic="T extends Displayable">
import { type ImageSrc } from "~/components/srcset-image/SrcSetImage.vue";
import { useGameDataName, useGameImage } from "~/composables/game-data";
import { type ItemGroup} from "~/composables/game-data";
import { type Displayable } from '~/data/types';

const props = defineProps<{
  items: Iterable<T>;
  noIcon?: boolean;
  itemTag?: string;
  getItemName?: (item: T) => string;
  getItemIcon?: (item: T) => ImageSrc | ReadonlyArray<ImageSrc> | null;
  getGroup?: (item: T) => ItemGroup
}>();
const slots = defineSlots<{
  header?: (props: { group: Readonly<ItemGroup>, items: ReadonlyArray<T> }) => unknown;
  item?: (props: { item: T }) => unknown;
}>();

const getItemName = props.getItemName ?? useGameDataName;
const getItemIcon = props.getItemIcon ?? ((item: T) => useGameImage(item.icon));

const groupMap = new Map<ItemGroup, T[]>();
if (props.getGroup !== undefined) {
  for (const item of props.items) {
    const group = props.getGroup(item);
    const groupItems = groupMap.get(group) ?? [];
    groupItems.push(item);
    groupMap.set(group, groupItems)
  }
}
const groups = [...groupMap.entries()];
</script>

<template>
  <q-list>
    <template v-if="groupMap.size === 0">
      <template v-if="slots.item !== undefined">
        <template v-for="item in props.items" :key="item.id">
          <slot name="item" :item="item"></slot>
        </template>
      </template>

      <template v-else>
        <q-item
          v-for="item in props.items"
          :key="item.id"
          class="py-0 pr-2"
          :tag="itemTag"
        >
          <q-item-section
            avatar
            v-if="!noIcon"
            :class="{middle: slots.item !== undefined}"
          >
            <SrcSetImage
              :src="getItemIcon(item)"
              class="aspect-square w-8"
              aria-hidden="true"
            />
          </q-item-section>

          <q-item-section class="flex-basis-1/2">
            <q-item-label> {{ getItemName(item) }} </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </template>
    <template v-else v-for="[group, items] in groups" :key="group.id">
      <q-expansion-item default-closed :label="group.label">
        <template v-if="slots.header !== undefined" v-slot:header>
          <slot name="header" :group="group" :items="items"></slot>
        </template>

        <template v-if="slots.item !== undefined">
          <template v-for="item in props.items" :key="item.id">
            <slot name="item" :item="item"></slot>
          </template>
        </template>

        <template v-else>
          <q-item
            v-for="item in props.items"
            :key="item.id"
            class="py-0 pr-2"
            :tag="itemTag"
          >
            <q-item-section
              avatar
              v-if="!noIcon"
              :class="{middle: slots.item !== undefined}"
            >
              <SrcSetImage
                :src="getItemIcon(item)"
                class="aspect-square w-8"
                aria-hidden="true"
              />
            </q-item-section>

            <q-item-section class="flex-basis-1/2">
              <q-item-label> {{ getItemName(item) }} </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-expansion-item>
    </template>
  </q-list>
</template>

<style lang="scss" scoped>
.q-item {
  &:has(:focus) {
    background-color: var(--background-highlight);
  }
}
</style>
