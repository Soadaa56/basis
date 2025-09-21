<script setup lang="ts">
import BaseWorkerText from '@/components/ui/BaseWorkerText.vue'
</script>

<template>
  <div class="worker-panel-container">
    <h2>Workers Panel</h2>
    <h4>Unemployed: 1/1</h4>
    <base-worker-text name="Unassigned" :assigned-workers="1" :max-job-slots="1"></base-worker-text>
    <base-worker-text name="Farmer" :assigned-workers="0" :max-job-slots="0"></base-worker-text>
  </div>
</template>

<style scoped></style>
