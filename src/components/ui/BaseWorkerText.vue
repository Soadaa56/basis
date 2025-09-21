<script setup lang="ts">
defineProps<{
  name: string
  assignedWorkers: number
  maxJobSlots: number
}>()
</script>

<template>
  <div class="worker-text">
    <span class="worker-name">{{ name }}</span>
    <span class="worker-assigned">{{ assignedWorkers }} / {{ maxJobSlots }}</span>
  </div>
</template>

<style scoped>
.worker-text {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
