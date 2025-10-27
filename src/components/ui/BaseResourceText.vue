<script setup lang="ts">
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
  name: string
  value: number
  max: number
  income: number
}>()
</script>

<template>
  <div class="resource-text">
    <span class="resource-name">{{ name }}:</span>
    <tooltip-resource-storage>
      <span class="resource-numbers">{{ value.toFixed(0) }}/{{ max }}</span>
    </tooltip-resource-storage>
    <tooltip-resource-income>
      <span class="income">+{{ formatIncome(income) }}/s</span>
    </tooltip-resource-income>
  </div>
</template>

<style scoped>
.resource-text {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0.2rem;
}

.income {
  color: green;
}
</style>
