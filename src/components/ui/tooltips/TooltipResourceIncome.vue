<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import { inject } from 'vue'
import { useGameStore } from '@/stores/game'
import { ResourceSystem } from '@/game/systems/ResourceSystem'

const resourceSystem = inject<ResourceSystem>('resourceSystem')
const gameStore = useGameStore()
</script>

<template>
  <BaseTooltip>
    <div class="tooltip-container">
      <slot />
    </div>
  </BaseTooltip>
</template>

<style scoped lang="scss"></style>
