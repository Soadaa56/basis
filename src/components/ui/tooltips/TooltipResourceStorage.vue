<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import { inject } from 'vue'
import { useGameStore } from '@/stores/game'
import { ResourceSystem } from '@/game/systems/ResourceSystem'
import type { ResourceId } from '@/game/models/Resource'

const resourceSystem = inject<ResourceSystem>('resourceSystem')
const gameStore = useGameStore()

const props = defineProps<{
  resourceId: ResourceId
}>()

const resource = resourceSystem?.getResourceById(props.resourceId)
</script>

<template>
  <BaseTooltip>
    <div class="tooltip-container">
      <slot />
    </div>
  </BaseTooltip>
</template>

<style scoped lang="scss"></style>
