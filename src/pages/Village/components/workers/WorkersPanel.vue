<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseWorkerText from '@/components/ui/BaseWorkerText.vue'

const gameStore = useGameStore().manager
</script>

<template>
  <div v-if="gameStore" class="worker-panel-container">
    <h2>Workers Panel</h2>
    <h4>
      {{ gameStore?.gameState.workers.unassignedWorkerCount }} /
      {{ gameStore?.gameState.workers.maxWorkerCount }} Worker Unassigned
    </h4>
    <base-worker-text
      v-for="job in gameStore.gameState.jobs"
      :key="job.id"
      :id="job.id"
      :name="job.name"
      :assigned-workers="job?.assignedWorkers"
      :max-job-slots="job?.totalJobs"
      @assign="gameStore.addWorkerToJob(job.id)"
      @unassign="gameStore.removeWorkerFromJob(job.id)"
    />
  </div>
</template>

<style scoped></style>
