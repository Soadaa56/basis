<script setup lang="ts">
import BaseWorkerText from '@/components/ui/BaseWorkerText.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const jobLimited = gameStore.manager.gameState.jobs.filter((job) => job.totalJobs !== Infinity)
const jobUnlimited = gameStore.manager.gameState.jobs.filter((job) => job.totalJobs === Infinity)
</script>
<template>
  <div v-if="gameStore" class="worker-panel-container">
    <h2>Workers Panel</h2>
    <h3>
      {{ gameStore.manager.gameState.workers.unassignedWorkerCount }} /
      {{ gameStore.manager.gameState.workers.maxWorkerCount }} Worker Unassigned
    </h3>
    <BaseWorkerText
      v-for="job in jobUnlimited"
      :key="job.id"
      :jobId="job.id"
      :name="job.name"
      :assigned-workers="job?.assignedWorkers"
      :max-job-slots="job?.totalJobs"
      @assign="gameStore.manager.addWorkerToJob(job.id)"
      @unassign="gameStore.manager.removeWorkerFromJob(job.id)"
      class="job-unlimited"
    />
    <BaseWorkerText
      v-for="job in jobLimited"
      :key="job.id"
      :jobId="job.id"
      :name="job.name"
      :assigned-workers="job?.assignedWorkers"
      :max-job-slots="job?.totalJobs"
      @assign="gameStore.manager.addWorkerToJob(job.id)"
      @unassign="gameStore.manager.removeWorkerFromJob(job.id)"
      class="job-limited"
    />
  </div>
</template>

<style scoped lang="scss">
.job-unlimited {
  color: var(--accent-color);
}

.job-limited {
  color: var(--secondary-color);
}
</style>
