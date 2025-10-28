<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import { JobDescriptions } from '@/game/data/jobDescriptions'
import type { JobId } from '@/game/models/Jobs'

const props = defineProps<{
  jobId: JobId
}>()
const jobDescription = JobDescriptions[props.jobId]
</script>

<template>
  <BaseTooltip>
    <template #default>
      <div class="job-wrapper">
        <slot />
      </div>
    </template>
    <template #tooltip>
      <div class="tooltip-container">
        <div class="job-info">
          <div>{{ jobDescription }}</div>
        </div>
      </div>
    </template>
  </BaseTooltip>
</template>

<style scoped lang="scss"></style>
