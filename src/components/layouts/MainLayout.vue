<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { loadSaveFile } from '@/utils/saveFile'
import VillagePage from '@//pages/Village/VillagePage.vue'
import MagicPage from '@//pages/Magic/MagicPage.vue'
import SettingsPage from '@//pages/Settings/SettingsPage.vue'

const route = useRoute()
const currentSaveFile = loadSaveFile()
const villageName = currentSaveFile?.villageName
const activePage = ref(VillagePage)
</script>

<template>
  <header v-if="route.meta.hideHeader !== true">
    <nav>
      <button @click="activePage = VillagePage">{{ villageName }} Village</button>
      <button @click="activePage = MagicPage">Magic</button>
      <button @click="activePage = SettingsPage">Settings</button>
    </nav>
  </header>
  <main>
    <component :is="activePage" />
  </main>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  outline: 3px solid black;
  padding: 4px;
  button {
    list-style: none;
    padding: 1rem;
    outline: 2px solid black;

    &:hover {
      background: lightgray;
    }
  }
}
</style>
