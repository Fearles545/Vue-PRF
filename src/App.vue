<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ToolBar from './components/ToolBar.vue'
// import { PrimaryButton, SecondaryButton } from 'components-library'
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
