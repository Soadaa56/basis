<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import { computed, inject } from 'vue'
import { ResourceSystem } from '@/game/systems/ResourceSystem'
import type { ResourceId } from '@/game/models/Resource'

const resourceSystem = inject<ResourceSystem>('resourceSystem')

const props = defineProps<{
  resourceId: ResourceId
}>()

const resource = computed(() => {
  if (!resourceSystem) return null
  return resourceSystem.getResourceById(props.resourceId)
})
</script>

<template>
  <BaseTooltip>
    <template #default>
      <div class="resource-storage-wrapper">
        <slot />
      </div>
    </template>
    <template #tooltip>
      <div class="tooltip-container">
        <div class="resource-name">{{ resource?.name }}</div>
        <div class="resource-income-info row">
          <div class="income-base" v-if="resource?.baseIncome">
            <span class="source">Base: </span>
            <span class="amount">+ {{ resource.baseIncome }}</span>
          </div>
          <div
            class="income-buildings"
            v-for="(amount, source) in resource?.incomeSources.buildings"
            :key="source"
          >
            <span class="source">{{ source }}: </span>
            <span class="amount">+ {{ amount }}</span>
          </div>
          <div class="income-jobs" v-for="(amount, source) in resource?.incomeSources.jobs" :key="source">
            <span class="source">{{ source }}: </span>
            <span class="amount">+ {{ amount }}</span>
          </div>
        </div>
      </div>
    </template>
  </BaseTooltip>
</template>

<style scoped lang="scss">
.resource-name {
  color: var(--secondary-color);
  text-decoration: underline;
  margin-bottom: 0.25rem;
}

.resource-income-info {
  display: flex;
  flex-direction: column;
}

.source {
  text-transform: capitalize;
  text-align: left;
}

.amount {
  text-align: right;
}
</style>
