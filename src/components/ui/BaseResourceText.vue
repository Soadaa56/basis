<script setup lang="ts">
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
    <span class="resource-numbers">{{ value.toFixed(0) }}/{{ max }}</span>
    <span class="income">(+{{ formatIncome(income) }}/s)</span>
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
