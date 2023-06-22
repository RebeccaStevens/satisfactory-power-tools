<script setup lang="ts">
import { useMainMenu } from "./main-menu";

const menu = useMainMenu();
</script>

<template>
  <q-header elevated>
    <q-toolbar class="flex p-2">
      <template v-for="menuItem in menu" :key="menuItem.link">
        <router-link v-if="menuItem.type === 'link'" :to="menuItem.link">
          <q-btn
            flat
            class="capitalize text-base @xl:text-lg mx-2"
            >{{ menuItem.label }}</q-btn
          >
        </router-link>
      </template>

      <span class="flex-grow"></span>

      <DonateBtn class="flex-none h-12 m-0 p-2"></DonateBtn>
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped></style>
