<script setup lang="ts">
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
    <span class="resource-numbers">{{ value.toFixed(1) }}/{{ max }}</span>
    <span class="income">(+{{ income }}/s)</span>
  </div>
</template>

<style scoped>
.resource-text {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}

.income {
  color: green;
}
</style>
