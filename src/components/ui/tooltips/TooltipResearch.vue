<script setup lang="ts">
import { inject } from 'vue'
import BaseTooltip from './BaseTooltip.vue'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import { useGameStore } from '@/stores/game'
import type { Research } from '@/game/models/Research'

const gameStore = useGameStore()
const research = inject<Research>('research')
const knowledgeCost = research?.cost.find((res) => res.resourceId === ResourceIds.Knowledge)
const resourceCost = research?.cost.filter((res) => res.resourceId !== ResourceIds.Knowledge)

function canAffordCost(costs: ResourceCost[]) {
  return gameStore.manager.resourceSystem.canAfford(costs)
}
</script>

<template>
  <BaseTooltip>
    <template #default>
      <div class="research-wrapper">
        <slot />
      </div>
    </template>
    <template #tooltip>
      <div class="tooltip-container" v-if="research">
        <div class="category" v-if="research.category">Category: {{ research.category }}</div>
        <div class="costs">
          <div
            class="cost-research"
            v-if="knowledgeCost"
            :class="{ affordable: canAffordCost(research.cost), unaffordable: !canAffordCost(research.cost) }"
          >
            {{ knowledgeCost.resourceId }}: {{ knowledgeCost.amount }}
          </div>
          <div class="cost-resource-list" v-if="resourceCost">
            <div
              class="cost-resource"
              v-for="(extraCost, i) in resourceCost"
              :key="i"
              :class="{
                affordable: canAffordCost(research.cost),
                unaffordable: !canAffordCost(research.cost),
              }"
            >
              {{ extraCost.resourceId }}: {{ extraCost.amount }}
            </div>
          </div>
        </div>
        <div class="description" v-if="research.description">{{ research.description }}</div>
      </div>
    </template>
  </BaseTooltip>
</template>

<style scoped lang="scss">
.category {
  color: var(--secondary-color);
  text-transform: capitalize;
  border-bottom: 0.5px solid black;
}

.costs {
  text-transform: capitalize;
  margin-top: 0.5rem;
  border-bottom: 1px solid var(--line-divide-color);
}

.description {
  margin-top: 0.5rem;
}

.affordable {
  color: var(--basic-text-color);
}

.unaffordable {
  color: var(--cost-problem-color);
}
</style>
