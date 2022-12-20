<script setup lang="ts">
import { useMainMenu } from "./main-menu";

const menu = useMainMenu();
</script>

<template>
  <nav>
    <template v-for="menuItem in menu" :key="menuItem.link">
      <router-link v-if="menuItem.type === 'link'" :to="menuItem.link">
        <q-btn flat>{{ menuItem.label }}</q-btn>
      </router-link>
    </template>

    <span class="grow"></span>

    <DonateBtn class="donate-btn"></DonateBtn>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background-color: var(--q-primary);
  display: flex;
  padding: 0.5rem;
  height: 3rem;

  & > * {
    height: auto;
  }
}

.q-btn {
  @extend .q-mx-sm;
  @extend .q-px-sm;
  text-transform: capitalize;
  font-size: 1rem;

  &.donate-btn {
    @extend .q-ma-none;
    @extend .q-px-sm;
  }
}

@container (height >= 50rem) {
  nav {
    height: 4rem;
  }
  .q-btn {
    font-size: 1.2rem;
  }
}
</style>
