<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'
import type { ResourceCost } from '@/game/models/Resource'
import type { BuildingId } from '@/game/data/buildingsId'

const gameStore = useGameStore()
const costAffordability = computed(() => {
  return props.cost.map((cost) => ({
    ...cost,
    affordable: gameStore.manager.resourceSystem.canAffordSingleCost(cost),
  }))
})

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
      <div class="building-wrapper">
        <slot />
      </div>
    </template>
    <template #tooltip>
      <div class="tooltip-container">
        <div class="effect">{{ props.purchaseEffectText }}</div>
        <div class="costs-container">
          <div
            v-for="cost in costAffordability"
            :key="cost.resourceId"
            class="costs"
            :class="{
              affordable: cost.affordable,
              unaffordable: !cost.affordable,
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

.affordable {
  color: var(--basic-text-color);
}

.unaffordable {
  color: var(--cost-problem-color);
}
</style>
