<script setup lang="ts">
import { markRaw, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { loadSaveFile } from '@/utils/saveFile'
import VillagePage from '@/pages/Village/VillagePage.vue'
import MagicPage from '@/pages/Magic/MagicPage.vue'
import SettingsPage from '@/pages/Settings/SettingsPage.vue'

const route = useRoute()
const currentSaveFile = loadSaveFile()
const villageName = currentSaveFile?.villageName

// Use shallowRed/markRaw for Vue performance warning
const activePage = shallowRef(markRaw(VillagePage))
// eslint-disable-next-line
function switchPage(page: any) {
  activePage.value = markRaw(page)
}
</script>

<template>
  <header v-if="route.meta.hideHeader !== true">
    <nav>
      <button @click="switchPage(VillagePage)">{{ villageName }} Village</button>
      <button @click="switchPage(MagicPage)">Magic</button>
      <button @click="switchPage(SettingsPage)">Settings</button>
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
