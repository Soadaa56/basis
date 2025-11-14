<script setup lang="ts">
import BaseResearchCard from '@/components/ui/BaseResearchCard.vue'
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const gameStore = useGameStore()
const unlockedReseach = computed(() => gameStore.manager.researchSystem.getAllUnlockedResearch)
</script>

<template>
  <h2>Research</h2>
  <div class="research-panel">
    <BaseResearchCard
      v-for="research in unlockedReseach"
      :key="research.id"
      :research="research"
      @purchase="gameStore.manager.purchaseResearch(research)"
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
