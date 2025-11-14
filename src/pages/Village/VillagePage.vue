<script setup lang="ts">
import ResourcesPanel from './components/resources/ResourcesPanel.vue'
import MainPanel from './components/ui/MainPanel.vue'
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;
  /* height: 75vh; */

  .resource-panel {
    outline: 1px solid var(--accent-color);
  }

  .log-panel {
    outline: 1px solid var(--accent-color);
  }
}

.main-panel-container {
  flex-grow: 1;
  margin: 0 5rem 0 5rem;
}

// Simulate spacing of a log panel for now
.log-panel {
  min-width: 200px;
  max-width: 400px;

  p {
    text-align: center;
  }
}

.bold {
  font-weight: bolder;
  font-size: 1.2rem;
}
</style>
