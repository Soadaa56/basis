<script setup lang="ts">
import BuildingTooltip from './tooltips/BuildingTooltip.vue'
import type { BuildingId } from '@/game/data/buildingsId'
import type { ResourceCost } from '@/game/models/Resource'

defineProps<{
  id: BuildingId
  name: string
  cost: ResourceCost[]
  count: number
  maxCount?: number
  purchaseEffectText: string
  flavorText?: string
}>()

const emit = defineEmits<{
  (e: 'purchase', buildingId: BuildingId): void
}>()
</script>

<template>
  <building-tooltip :name="name" :cost="cost" :purchase-effect-text="purchaseEffectText" :flavor-text="flavorText">
    <div class="building-card" @click="emit('purchase', id)">
      <p class="building-name">{{ name }}</p>
      <span class="building-count">{{ count }}</span>
    </div>
  </building-tooltip>
</template>

<style scoped lang="scss">
.building-card {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  height: 40px;
  background-color: var(--bg-color);
  color: var(--basic-text-color);
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    filter: brightness(1.25);
    cursor: pointer;
  }
}

.building-name {
  margin: auto;
  font-size: 1.1rem;
}

.building-count {
  position: absolute;
  align-self: flex-end;
  background-color: var(--bg-color);
  filter: brightness(1.5);
  padding: 0.1rem;
}
</style>
