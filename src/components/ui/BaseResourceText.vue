<script setup lang="ts">
import type { ResourceId } from '@/game/models/Resource'
import TooltipResourceIncome from './tooltips/TooltipResourceIncome.vue'
import TooltipResourceStorage from './tooltips/TooltipResourceStorage.vue'

function formatIncome(income: number) {
  if (income == 0) {
    return 0
  }
  if (income < 0.01) {
    return income.toFixed(3)
  }
  if (income < 1) {
    return income.toFixed(2)
  }
  if (income < 100) {
    return income.toFixed(1)
  }

  return Math.round(income).toString
}

defineProps<{
  resourceId: ResourceId
  name: string
  value: number
  max: number
  income: number
}>()
</script>

<template>
  <div class="resource-text">
    <span class="resource-name">{{ name }}:</span>
    <tooltip-resource-storage :resource-id="resourceId" class="resource-numbers">
      <span class="storage">{{ value.toFixed(0) }} / {{ max }}</span>
    </tooltip-resource-storage>
    <tooltip-resource-income :resource-id="resourceId" class="resource-income">
      <span class="income">+{{ formatIncome(income) }} /s</span>
    </tooltip-resource-income>
  </div>
</template>

<style scoped>
.resource-text {
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 1fr));
  align-items: start;
  .resource-numbers {
    display: flex;
    justify-content: flex-end;
  }
  .resource-income {
    display: flex;
    justify-content: flex-end;
  }
}

.income {
  color: green;
}
</style>
