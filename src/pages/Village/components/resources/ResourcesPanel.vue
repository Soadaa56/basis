<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseResourceText from '@/components/ui/BaseResourceText.vue'

const gameStore = useGameStore().manager
</script>

<template>
  <div class="resource-panel-container">
    <h2>Resources Panel</h2>
    <base-resource-text
      v-for="resource in gameStore.resourceSystem.getAllResources()"
      :key="resource.id"
      :name="resource.name"
      :value="resource.currentAmount"
      :max="resource.calculatedStorage"
      :income="resource.calculatedIncome"
    />
  </div>
</template>

<style scoped>
.resource-panel-container {
  display: flex;
  flex-direction: column;
}
</style>
