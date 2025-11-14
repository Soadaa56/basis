<script setup lang="ts">
import TooltipResearch from './tooltips/TooltipResearch.vue'
import { provide } from 'vue'
import { useGameStore } from '@/stores/game'
import type { Research } from '@/game/models/Research'
import type { ResourceCost } from '@/game/models/Resource'

const gameStore = useGameStore()

function canAffordResearchCosts(costs: ResourceCost[]): boolean {
  return gameStore.manager.resourceSystem.canAfford(costs)
}

function canAffordWithCurrentStorage(costs: ResourceCost[]): boolean {
  return gameStore.manager.resourceSystem.canAffordWithCurrentStorage(costs)
}

const props = defineProps<{
  research: Research
}>()

provide('research', props.research)

const emit = defineEmits<{
  (e: 'purchase', researchId: string): void
}>()
</script>

<template>
  <tooltip-research>
    <div
      class="research-card"
      @click="emit('purchase', research.id)"
      :class="{
        affordable: canAffordResearchCosts(research.cost),
        unaffordable: !canAffordResearchCosts(research.cost),
        hasEnoughStorage: canAffordWithCurrentStorage(research.cost),
        notEnoughStorage: !canAffordWithCurrentStorage(research.cost),
      }"
    >
      <p class="research-name">{{ research.name }}</p>
    </div>
  </tooltip-research>
</template>

<style scoped lang="scss">
.research-card {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  min-height: 40px;
  background-color: var(--bg-color);
  color: var(--basic-text-color);
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    filter: brightness(1.11);
    cursor: pointer;
  }
}

.research-name {
  margin: auto;
  font-size: 1.1rem;
}

.affordable {
  transition: 0.3s ease-in;
  background-color: var(--bg-color);
}

.unaffordable {
  transition: 0.3s ease-in;
  background-color: var(--bg-storage-problem-color);
}

.affordableStorage {
  color: var(--basic-text-color);
}

.unaffordableStorage {
  color: var(--storage-cost-problem-color);
}
</style>
