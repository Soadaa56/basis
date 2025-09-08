<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header v-if="route.meta.hideHeader !== true">
    <nav>
      <ul id="navbar">
        <li>Town</li>
        <li>Magic</li>
        <li>Settings</li>
      </ul>
    </nav>
  </header>
  <main>
    <slot />
  </main>
  <footer></footer>
</template>

<style scoped>
#navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;

  li {
    list-style: none;
  }
}
</style>
