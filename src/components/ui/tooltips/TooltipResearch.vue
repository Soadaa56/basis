<script setup lang="ts">
import { inject } from 'vue'
import BaseTooltip from './BaseTooltip.vue'
import type { Research } from '@/game/models/Research'
import { ResourceIds } from '@/game/models/Resource'

const research = inject<Research>('research')
const knowledgeCost = research?.cost.find((res) => res.resourceId === ResourceIds.Research)
const resourceCost = research?.cost.filter((res) => res.resourceId !== ResourceIds.Research)
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
          <div class="cost-research" v-if="knowledgeCost">
            {{ knowledgeCost.resourceId }}: {{ knowledgeCost.amount }}
          </div>
          <div class="cost-resource-list" v-if="resourceCost">
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
.tooltip-container :not(:last-child) {
  border-bottom: 1px solid var(--line-divide-color);
}
.tooltip-container :not(:first-child) {
  margin-bottom: 0.1rem;
}

.name {
  margin-bottom: 0.5rem;
}

.category {
  color: var(--secondary-color);
  text-transform: capitalize;
}

.costs {
  text-transform: capitalize;
}
</style>
