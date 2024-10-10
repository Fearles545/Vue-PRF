<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToolBar from './components/ToolBar.vue'
</script>

<template>
  <ToolBar />

  <section class="router-view">
    <RouterView />
  </section>
</template>

<style scoped>
.router-view {
  margin: 2rem;
}
</style>
