<script setup lang="ts">
import { computed, inject } from 'vue'
import BaseTooltip from './BaseTooltip.vue'
import type { Research } from '@/game/models/Research'
import type { ResourceCost } from '@/game/models/Resource'

// import { useGameStore } from '@/stores/game'
// const gameStore = useGameStore()

const research = inject<Research>('research')
const resourceCost = computed<ResourceCost[]>(() => research?.resourceCost ?? [])
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
        <div class="name">{{ research.name }}</div>
        <div class="category" v-if="research.category">Category: {{ research.category }}</div>
        <div class="costs">
          <div class="cost-research">Research Cost: {{ research.cost }}</div>
          <div class="cost-resource-list" v-if="research.resourceCost">
            <div class="cost-resource" v-for="(extraCost, i) in resourceCost" :key="i">
              {{ extraCost.resourceId }}: {{ extraCost.resourceId }}
            </div>
          </div>
        </div>
        <div class="description" v-if="research.description">{{ research.description }}</div>
      </div>
    </template>
  </BaseTooltip>
</template>

<style scoped lang="scss">
.tooltip-container > * {
  border-bottom: 1px solid var(--line-divide-color);
}

.name {
  margin-bottom: 0.25rem;
}

.category {
  color: var(--secondary-color);
  text-transform: capitalize;
}
</style>
