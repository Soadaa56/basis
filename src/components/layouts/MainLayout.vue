<script setup lang="ts">
import { useRoute } from 'vue-router'
import { loadSaveFile } from '@/utils/saveFile'

const route = useRoute()
const currentSaveFile = loadSaveFile()
const villageName = currentSaveFile?.villageName
</script>

<template>
  <header v-if="route.meta.hideHeader !== true">
    <nav>
      <ul id="navbar">
        <li>{{ villageName }} Village</li>
        <li>Magic</li>
        <li>Settings</li>
      </ul>
    </nav>
  </header>
  <main>
    <slot />
  </main>
</template>

<style scoped>
#navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  outline: 3px solid black;
  padding: 4px;
  li {
    list-style: none;
    padding: 1rem;
    outline: 2px solid black;

    &:hover {
      background: lightgray;
    }
  }
}
</style>
