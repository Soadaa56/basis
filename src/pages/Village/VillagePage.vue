<script setup lang="ts">
import ResourcesPanel from './components/resources/ResourcesPanel.vue'
import WorkersPanel from './components/workers/WorkersPanel.vue'
import BuildingsPanel from './components/buildings/BuildingsPanel.vue'
</script>

<template>
  <div class="village-container">
    <div class="resource-panel bg-grey">
      <resources-panel></resources-panel>
    </div>
    <div class="building-panel">
      <buildings-panel></buildings-panel>
    </div>
    <div class="worker-panel bg-grey">
      <workers-panel></workers-panel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.village-name-header {
  text-align: center;
}

.village-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;
  /* height: 75vh; */
}

.building-panel {
  flex-grow: 1;
  margin: 0 5rem 0 5rem;
}
</style>
