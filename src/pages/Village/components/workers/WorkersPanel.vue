<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseWorkerText from '@/components/ui/BaseWorkerText.vue'

const gameStore = useGameStore().manager

console.log(gameStore?.gameState.jobs)
</script>

<template>
  <div class="worker-panel-container">
    <h2>Workers Panel</h2>
    <h4>
      {{ gameStore?.gameState.workers.unassignedWorkerCount }} /
      {{ gameStore?.gameState.workers.maxWorkerCount }} Worker Unassigned
    </h4>
    <base-worker-text
      v-for="job in gameStore?.gameState.jobs"
      :key="job.id"
      :name="job.name"
      :assigned-workers="job?.assignedWorkers"
      :max-job-slots="job?.totalJobs"
    />

    <base-worker-text name="Farmer" :assigned-workers="0" :max-job-slots="0"></base-worker-text>
  </div>
</template>

<style scoped></style>
