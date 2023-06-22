<script setup lang="ts"></script>

<template>
  <q-layout class="text-base">
    <HeaderBar></HeaderBar>
    <q-page-container>
      <q-page>
        <q-scroll-area class="absolute inset-0 top-4">
          <RouterView />
          <div class="h-4"></div>
        </q-scroll-area>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
