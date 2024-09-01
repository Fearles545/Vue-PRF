<script setup lang="ts">
import Assignments from '../components/Assignments.vue'
</script>

<template>
  <main>
    <section class="home-container">
      <h1 class="title">Welcome</h1>
      <p class="home-text">
        This is an app for managing users and their assignments. <br />
        There are dedicated menus for users and assignments. You can find them in the navigation
        bar.
      </p>
    </section>
  </main>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  width: 80%;
}

.title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.home-text {
  font-size: 1.2rem;
}
</style>
