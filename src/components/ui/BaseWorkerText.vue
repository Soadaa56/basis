<script setup lang="ts">
import type { JobId } from '@/game/models/Jobs'

defineProps<{
  name: string
  id: JobId
  assignedWorkers: number
  maxJobSlots: number
}>()

const emit = defineEmits<{
  (e: 'assign', jobId: JobId): void
  (e: 'unassign', jobId: JobId): void
}>()
</script>

<template>
  <div class="worker-text">
    <span class="worker-name">{{ name }}:</span>
    <FaIcon class="awesome-icon" :icon="['fas', 'minus']" size="1x" @click="emit('unassign', id)" />
    <span class="worker-assigned">{{ assignedWorkers }} / {{ maxJobSlots }}</span>
    <FaIcon class="awesome-icon" :icon="['fas', 'plus']" size="1x" @click="emit('assign', id)" />
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
