<script setup lang="ts">
import { useMainMenu } from "./main-menu";

const menu = useMainMenu();
</script>

<template>
  <nav>
    <template v-for="(menuItem, menuIndex) in menu" :key="menuIndex">
      <router-link v-if="menuItem.type === 'link'" :to="menuItem.link">
        <ABtn>{{ menuItem.label }}</ABtn>
      </router-link>
    </template>

    <span class="grow"></span>

    <DonateBtn></DonateBtn>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background-color: hsla(var(--a-primary));
  display: flex;
  padding: 0.5rem;
  height: 3rem;

  & > * {
    height: auto;
  }
}

.a-btn {
  text-transform: capitalize;
  font-size: 1rem;
}

@container (height >= 50rem) {
  nav {
    height: 4rem;
  }
  .a-btn {
    font-size: 1.2rem;
  }
}
</style>
