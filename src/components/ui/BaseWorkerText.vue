<script setup lang="ts">
defineProps<{
  name: string
  assignedWorkers: number
  maxJobSlots: number
}>()
</script>

<template>
  <div class="worker-text">
    <span class="worker-name">{{ name }}:</span>
    <FaIcon class="awesome-icon" :icon="['fas', 'minus']" size="1x" />
    <span class="worker-assigned">{{ assignedWorkers }} / {{ maxJobSlots }}</span>
    <FaIcon class="awesome-icon" :icon="['fas', 'plus']" size="1x" />
  </div>
</template>

<style scoped>
.worker-text {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.2rem;
}

.awesome-icon:hover {
  transform: scale(1.05);
}
</style>
