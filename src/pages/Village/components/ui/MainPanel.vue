<script setup lang="ts">
import { ref } from 'vue'
import BuildingsPanel from '../buildings/BuildingsPanel.vue'
import WorkersPanel from '../workers/WorkersPanel.vue'
import ResearchPanel from '../research/ResearchPanel.vue'

const tabs = {
  BuildingsPanel: { label: 'Buildings', component: BuildingsPanel },
  WorkersPanel: { label: 'Workers', component: WorkersPanel },
  ResearchPanel: { label: 'Research', component: ResearchPanel },
}

type TabKey = keyof typeof tabs
const currentTab = ref<TabKey>('BuildingsPanel')
</script>

<template>
  <div class="main-panel">
    <nav>
      <ul class="tabs">
        <li
          v-for="(tabData, tabKey) in tabs"
          :key="tabKey"
          :class="['tab', { active: currentTab === tabKey }]"
          @click="currentTab = tabKey"
        >
          {{ tabData.label }}
        </li>
      </ul>
    </nav>
    <component :is="tabs[currentTab].component" class="active-tab"></component>
  </div>
</template>

<style scoped lang="scss">
.main-panel {
  padding: 0rem 2rem;
  user-select: none;
  overflow-x: auto;
}

.tabs {
  display: flex;
  justify-content: flex-start;
  border-bottom: 2px solid var(--line-divide-color);
  padding-inline-start: 0;
}

.tab {
  list-style-type: none;
  padding: 0.25rem 2rem;
  cursor: pointer;
  color: var(--basic-text-color);
  background: var(--webpage-background-color);

  &:hover {
    background: var(--bg-color);
  }

  &.active {
    color: var(--text-color);
  }
}
</style>
