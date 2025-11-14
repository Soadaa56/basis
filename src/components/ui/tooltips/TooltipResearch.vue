<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import { inject, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import type { Research } from '@/game/models/Research'

const gameStore = useGameStore()
const research = inject<Research>('research')
const costAffordability = computed(() => {
  return research?.cost.map((cost) => ({
    ...cost,
    affordable: gameStore.manager.resourceSystem.canAffordSingleCost(cost),
  }))
})
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
            class="cost-resource"
            v-for="(extraCost, i) in costAffordability"
            :key="i"
            :class="{
              affordable: extraCost.affordable,
              unaffordable: !extraCost.affordable,
            }"
          >
            {{ extraCost.resourceId }}: {{ extraCost.amount }}
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
