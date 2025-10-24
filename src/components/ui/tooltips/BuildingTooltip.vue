<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import { useGameStore } from '@/stores/game'
import type { ResourceId, ResourceCost } from '@/game/models/Resource'
import type { BuildingId } from '@/game/data/buildingsId'

const gameStore = useGameStore()

function canAffordBuildingWithCurrentStorage(buildingId: BuildingId) {
  return gameStore.manager.canAffordBuildingWithCurrentStorage(buildingId)
}

function canAffordCostWithCurrentStorage(buildingId: BuildingId, resourceId: ResourceId) {
  return gameStore.manager.canAffordCostWithCurrentStorage(buildingId, resourceId)
}

const props = defineProps<{
  id: BuildingId
  name: string
  cost: ResourceCost[]
  purchaseEffectText: string
  flavorText?: string
}>()
</script>

<template>
  <BaseTooltip>
    <template #default>
      <div
        class="building-wrapper"
        :class="{
          affordableStorage: canAffordBuildingWithCurrentStorage(id),
          unaffordableStorage: !canAffordBuildingWithCurrentStorage(id),
        }"
      >
        <slot />
      </div>
    </template>
    <template #tooltip>
      <div class="tooltip-container">
        <div class="effect">{{ props.purchaseEffectText }}</div>
        <div class="costs-container">
          <div
            v-for="cost in props.cost"
            :key="cost.resourceId"
            class="costs"
            :class="{
              affordableStorage: canAffordCostWithCurrentStorage(id, cost.resourceId),
              unaffordableStorage: !canAffordCostWithCurrentStorage(id, cost.resourceId),
            }"
          >
            <span class="cost-resource">{{ cost.resourceId }}: </span>
            <span class="cost-amount">{{ cost.amount }}</span>
          </div>
        </div>
        <div v-if="props.flavorText" class="flavor-text">{{ props.flavorText }}</div>
      </div>
    </template>
  </BaseTooltip>
</template>

<style scoped lang="scss">
.building-wrapper {
  border: 1px solid var(--secondary-color);
}
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
