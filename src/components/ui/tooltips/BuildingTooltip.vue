<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import { useGameStore } from '@/stores/game'
import type { ResourceCost } from '@/game/models/Resource'
import type { BuildingId } from '@/game/data/buildingsId'

const gameStore = useGameStore()

function canAffordBuildingWithCurrentStorage(buildingId: BuildingId) {
  return gameStore.manager.canAffordBuildingWithCurrentStorage(buildingId)
}

const props = defineProps<{
  id: BuildingId
  name: string
  cost: ResourceCost[]
  purchaseEffectText: string
  flavorText?: string
}>()

function formatCost(costs: ResourceCost[]) {
  return costs.map((cost) => `${cost.resourceId}: ${cost.amount}`)
}
</script>

<template>
  <BaseTooltip>
    <template #default>
      <div class="building-wrapper">
        <slot />
      </div>
    </template>
    <template #tooltip>
      <div class="tooltip-container">
        <div class="effect">{{ props.purchaseEffectText }}</div>
        <div class="costs-container">
          <div
            v-for="cost in formatCost(props.cost)"
            :key="cost"
            class="costs"
            :class="{
              affordableStorage: canAffordBuildingWithCurrentStorage(id),
              unaffordableStorage: !canAffordBuildingWithCurrentStorage(id),
            }"
          >
            {{ cost }}
          </div>
        </div>
        <div v-if="props.flavorText" class="flavor-text">{{ props.flavorText }}</div>
      </div>
    </template>
  </BaseTooltip>
</template>

<style scoped lang="scss">
.effect {
  border-bottom: 1px solid black;
  margin-bottom: 0.75rem;
}
.costs {
  text-transform: capitalize;
  font-size: 1.25em;
}

.costs-container {
  margin-bottom: 1rem;
}

.flavor-text {
  color: var(--text-color);
  border-top: 2px solid var(--tertiary-color);
  font-size: 0.85rem;
  text-wrap: balance;
  padding-left: 1rem;
  text-align: end;
}

.affordableStorage {
  color: var(--basic-text-color);
}

.unaffordableStorage {
  color: var(--storage-cost-problem-color);
}
</style>
