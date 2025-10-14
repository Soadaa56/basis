<script setup lang="ts">
import type { BuildingCost, BuildingId } from '@/game/models/Buildings'

defineProps<{
  id: BuildingId
  name: string
  cost: BuildingCost
  count: number
  maxCount: number
  purchaseEffectText: string
  flavorText: string
}>()

const emit = defineEmits<{
  (e: 'purchase', buildingId: BuildingId): void
}>()
</script>

<template>
  <div class="building-card" @click="emit('purchase', id)">
    <span class="building-name">{{ name }}</span>
    <span class="building-count">{{ count }}</span>
  </div>
</template>

<style scoped>
.building-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  /* border-radius: 5px; */

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
