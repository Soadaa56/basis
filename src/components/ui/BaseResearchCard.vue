<script setup lang="ts">
import type { Tier } from '@/game/models/Research'
import type { ResearchState } from '@/game/models/researches/ResearchState'
import type { ResourceCost } from '@/game/models/Resource'
// import { useGameStore } from '@/stores/game'

// const gameStore = useGameStore()

defineProps<{
  id: string
  name: string
  tier: Tier
  cost: number
  state?: ResearchState
  resourceCost?: ResourceCost
}>()

const emit = defineEmits<{
  (e: 'purchase', researchId: string): void
}>()
</script>

<template>
  <div class="research-card" @click="emit('purchase', id)">
    <p class="research-name">{{ name }}</p>
  </div>
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
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    filter: brightness(1.15);
    cursor: pointer;
  }
}

.research-name {
  margin: auto;
  font-size: 1.1rem;
}
</style>
