<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseResearchCard from '@/components/ui/BaseResearchCard.vue'

const gameStore = useGameStore()

const unlockedReseach = gameStore.manager.researchSystem.getAllUnlockedResearch
// remove later
const locked = gameStore.manager.researchSystem.getAllLockedResearch
</script>

<template>
  <h2>Research</h2>
  <div class="research-panel">
    <BaseResearchCard
      v-for="research in unlockedReseach"
      :key="research.id"
      :id="research.id"
      :name="research.name"
      :tier="research.tier"
      :cost="research.cost"
      :state="research.state"
      :resource-cost="research.resourceCost"
    />
    <!-- Just for dev; remove later -->
    <BaseResearchCard
      v-for="research in locked"
      :key="research.id"
      :id="research.id"
      :name="research.name"
      :tier="research.tier"
      :cost="research.cost"
      :state="research.state"
      :resource-cost="research.resourceCost"
      class="locked"
    />
  </div>
</template>

<style scoped lang="scss">
.research-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

// remove later
.locked {
  border-top: 10px solid limegreen;
  border-bottom: 15px solid cyan;
  border-left: 5px solid teal;
  border-right: 5px solid teal;
}
</style>
