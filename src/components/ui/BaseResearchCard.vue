<script setup lang="ts">
import { provide } from 'vue'
import TooltipResearch from './tooltips/TooltipResearch.vue'
import type { Research } from '@/game/models/Research'

// import { useGameStore } from '@/stores/game'

// const gameStore = useGameStore()

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
    <div class="research-card" @click="emit('purchase', research.id)">
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
