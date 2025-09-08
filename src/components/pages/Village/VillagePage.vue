<script setup lang="ts">
import { loadSaveFile } from '@/utils/saveFile'
import ResourcesPanel from './components/resources/ResourcesPanel.vue'
import WorkersPanel from './components/workers/WorkersPanel.vue'
import BuildingsPanel from './components/buildings/BuildingsPanel.vue'

const currentSaveFile = loadSaveFile()
const villageName = currentSaveFile?.villageName
</script>

<template>
  <h1 class="village-name-header">{{ villageName }}</h1>
  <div class="panel-container">
    <resources-panel></resources-panel>
    <workers-panel></workers-panel>
    <buildings-panel></buildings-panel>
  </div>
</template>

<style scoped>
.village-name-header {
  text-align: center;
}

.panel-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;
  height: 75vh;
}
</style>
