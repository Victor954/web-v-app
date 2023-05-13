<template>
  <MainLayout>
    <RouterView></RouterView>
  </MainLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainLayout from './components/layout/MainLayout.vue';
</script>