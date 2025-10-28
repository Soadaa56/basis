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

function storageFlatTotal(record: Record<string, number>): number {
  return Object.values(record).reduce((sum, value) => sum + value, 0)
}
</script>

<template>
  <BaseTooltip>
    <template #default>
      <div class="resource-current-storage-wrapper">
        <slot />
      </div>
    </template>
    <template #tooltip>
      <div class="tooltip-container">
        <div class="resource-name">{{ resource?.name }}</div>
        <div class="resource-storage-info row">
          <div class="storage-base">
            <span class="source">Base: </span>
            <span class="amount">+ {{ resource?.baseStorage }}</span>
          </div>
          <div
            class="storage-flat-bonus row"
            v-for="(amount, source) in resource?.baseStorageFlatBonus"
            :key="source"
          >
            <span class="source">{{ source }}: </span>
            <span class="amount">+ {{ amount }}</span>
          </div>
          <div class="storage-flat-bonus-summary row" v-if="resource?.baseStorageFlatBonus">
            <span class="source">Total Base Storage: </span>
            <span class="amount">
              {{ storageFlatTotal(resource.baseStorageFlatBonus) + resource.baseStorage }}</span
            >
          </div>
          <div
            class="storage-mult-bonus row"
            v-for="(amount, source) in resource?.baseStorageModifiers"
            :key="source"
          >
            <span class="source">{{ source }}: </span>
            <span class="amount">x {{ amount }}</span>
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
.resource-storage-info {
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
