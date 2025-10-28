<script setup lang="ts">
import TooltipJob from './tooltips/TooltipJob.vue'
import type { JobId } from '@/game/models/Jobs'

defineProps<{
  jobId: JobId
  name: string
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
    <tooltip-job :key="jobId" :job-id="jobId">
      <span class="worker-name">{{ name }}: </span>
      <span class="worker-assigned">{{ assignedWorkers }} / {{ maxJobSlots }}</span>
    </tooltip-job>
    <FaIcon class="awesome-icon" :icon="['fas', 'minus']" size="1x" @click="emit('unassign', jobId)" />
    <FaIcon class="awesome-icon" :icon="['fas', 'plus']" size="1x" @click="emit('assign', jobId)" />
  </div>
</template>

<style scoped>
.awesome-icon:hover {
  cursor: pointer;
}
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
