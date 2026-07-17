<script setup lang="ts">
import BaseWorkerText from '@/components/ui/BaseWorkerText.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const jobLimited = gameStore.manager?.jobSystem.getAllJobs.filter((job) => job.totalJobs !== Infinity)
const jobUnlimited = gameStore.manager?.jobSystem.getAllJobs.filter((job) => job.totalJobs === Infinity)
</script>
<template>
  <div v-if="gameStore" class="worker-panel-container">
    <h2>
      {{ gameStore.manager?.gameState.workers.unassignedWorkerCount }} /
      {{ gameStore.manager?.gameState.workers.maxWorkerCount }} <span>Workers Idle</span>
    </h2>
    <BaseWorkerText
      v-for="job in jobUnlimited"
      :key="job.id"
      :jobId="job.id"
      :name="job.name"
      :assigned-workers="job?.assignedWorkers"
      :max-job-slots="job?.totalJobs"
      @assign="gameStore.manager?.addWorkerToJob(job.id)"
      @unassign="gameStore.manager?.removeWorkerFromJob(job.id)"
      class="job-unlimited"
    />
    <BaseWorkerText
      v-for="job in jobLimited"
      :key="job.id"
      :jobId="job.id"
      :name="job.name"
      :assigned-workers="job?.assignedWorkers"
      :max-job-slots="job?.totalJobs"
      @assign="gameStore.manager?.addWorkerToJob(job.id)"
      @unassign="gameStore.manager?.removeWorkerFromJob(job.id)"
      class="job-limited"
    />
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-size: 2rem;
  span {
    margin-left: 24px;
  }
}
.job-unlimited {
  color: var(--accent-color);
}

.job-limited {
  color: var(--secondary-color);
}
</style>
