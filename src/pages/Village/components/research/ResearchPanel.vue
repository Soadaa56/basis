<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseResearchCard from '@/components/ui/BaseResearchCard.vue'

const gameStore = useGameStore()
</script>

<template>
  <h1>Research</h1>
  <div class="research-panel">
    <BaseResearchCard
      v-for="research in gameStore.manager.gameState.research"
      :key="research.id"
      :id="research.id"
      :name="research.name"
      :tier="research.tier"
      :cost="research.cost"
      :state="research.state"
      :resource-cost="research.resourceCost"
    />
  </div>
</template>

<style scoped lang="scss">
.research-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
