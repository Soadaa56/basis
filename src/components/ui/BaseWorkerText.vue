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
      <div class="jobs">
        <span class="worker-name">{{ name }}: </span>
        <span class="worker-limit workers-limit" v-if="maxJobSlots != Infinity"
          >{{ assignedWorkers }} / {{ maxJobSlots }}</span>
        <span class="worker-limit workers-no-limit" v-if="maxJobSlots == Infinity">{{ assignedWorkers }}</span>
      </div>
    </tooltip-job>
    <div class="icons">
      <FaIcon class="awesome-icon" :icon="['fas', 'minus']" size="1x" @click="emit('unassign', jobId)" />
      <FaIcon class="awesome-icon" :icon="['fas', 'plus']" size="1x" @click="emit('assign', jobId)" />
    </div>
  </div>
</template>

<style scoped>
.worker-text {
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: minmax(80px, 300px) 1fr;
}

.jobs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: start;
}

.icons {
  display: flex;
  gap: 16px;
  .awesome-icon {
    /* margin: 0 1rem; */
    padding: 1px;
  }
  .awesome-icon:hover {
    cursor: pointer;
    transition: 0.3s ease-out;
    filter: brightness(2);
  }
}
</style>
