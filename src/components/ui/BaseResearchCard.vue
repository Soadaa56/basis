<script setup lang="ts">
import type { ResearchCategory, ResearchEffect, Tier } from '@/game/models/Research'
import type { ResearchState } from '@/game/models/researches/ResearchState'
import type { ResourceCost } from '@/game/models/Resource'
// import { useGameStore } from '@/stores/game'

// const gameStore = useGameStore()

defineProps<{
  id: string
  name: string
  tier: Tier
  cost: number
  effect: ResearchEffect[]
  state?: ResearchState
  category?: ResearchCategory
  description?: string
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

<style scoped lang="scss"></style>
