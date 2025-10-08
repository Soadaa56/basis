<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseWorkerText from '@/components/ui/BaseWorkerText.vue'

const gameStore = useGameStore()
</script>

<template>
  <div v-if="gameStore" class="worker-panel-container">
    <h2>Workers Panel</h2>
    <h4>
      {{ gameStore.manager.gameState.workers.unassignedWorkerCount }} /
      {{ gameStore.manager.gameState.workers.maxWorkerCount }} Worker Unassigned
    </h4>
    <base-worker-text
      v-for="job in gameStore.manager.gameState.jobs"
      :key="job.id"
      :id="job.id"
      :name="job.name"
      :assigned-workers="job?.assignedWorkers"
      :max-job-slots="job?.totalJobs"
      @assign="gameStore.manager.addWorkerToJob(job.id)"
      @unassign="gameStore.manager.removeWorkerFromJob(job.id)"
    />
  </div>
</template>

<style scoped></style>
