<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header v-if="route.meta.hideHeader !== true">
    <nav id="navbar">
      <ul>
        <li>Town</li>
        <li>Idk</li>
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
}
</style>
