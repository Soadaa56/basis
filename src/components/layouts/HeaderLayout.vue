<script setup lang="ts">
import { useRoute } from 'vue-router'
import { loadSaveFile } from '@/utils/saveFile'
import VillagePage from '@/pages/Village/VillagePage.vue'
import MagicPage from '@/pages/Magic/MagicPage.vue'
import SettingsPage from '@/pages/Settings/SettingsPage.vue'

const route = useRoute()
const currentSaveFile = loadSaveFile()
const villageName = currentSaveFile?.villageName || "Basis"

const emit = defineEmits<{ switchPage: [page: unknown] }>()
</script>

<template>
  <header v-if="route.meta.hideHeader !== true">
    <nav>
      <button @click="emit('switchPage', VillagePage)">{{ villageName }} Village</button>
      <button @click="emit('switchPage', MagicPage)">Magic</button>
      <button @click="emit('switchPage', SettingsPage)">Settings</button>
    </nav>
  </header>
</template>

<style scoped lang="scss">
nav {
  background-color: var(--bg-color);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  outline: 1px solid var(--accent-color);
  padding: 4px;
  margin: 1rem;
  button {
    background-color: var(--accent-color);
    font-size: 1.4rem;
    list-style: none;
    padding: 1rem;
    outline: 2px solid black;
    transition: 0.3s ease-out;

    &:hover {
      filter: brightness(1.25);
      color: var(--main-color);
    }
  }
}</style>
