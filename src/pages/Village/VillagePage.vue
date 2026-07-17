<script setup lang="ts">
import ResourcesPanel from '@/pages/Village/components/resources/ResourcesPanel.vue'
import MainPanel from '@/pages/Village/components/ui/MainPanel.vue'
</script>

<template>
  <div class="village-container">
    <div class="resource-panel bg-grey">
      <resources-panel></resources-panel>
    </div>
    <div class="main-panel-container">
      <main-panel></main-panel>
    </div>
    <div class="log-panel bg-grey">
      <h2>Temp</h2>
      <p>Simulate Spacing</p>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <span class="bold">Officiis</span>,
        quisquam?
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.village-container {
  display: grid;
  grid-template-columns: 2fr 8fr 1fr;
  margin: 1rem;

  .resource-panel {
    outline: 1px solid var(--accent-color);
  }

  .log-panel {
    outline: 1px solid var(--accent-color);
  }
}

.main-panel-container {
  flex-grow: 1;
  margin-inline-start: 2rem;
  margin-inline-end: 5rem;
}

// Simulate spacing of a log panel for now
.log-panel {
  flex-shrink: 3;
  min-width: 120px;
  max-width: 300px;

  p {
    text-align: center;
  }
}

.bold {
  font-weight: bolder;
  font-size: 1.2rem;
}
</style>
