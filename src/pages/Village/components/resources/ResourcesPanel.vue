<script setup lang="ts">
import BaseResourceText from '@/components/ui/BaseResourceText.vue'
import { provide } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
provide('resourceSystem', gameStore.manager.resourceSystem)
</script>

<template>
  <button @click="gameStore.manager.fillResources">Fill Resources</button>
  <div v-if="gameStore" class="resource-panel-container">
    <h2>Resources Panel</h2>
    <base-resource-text
      v-for="resource in gameStore.manager.resourceSystem.getAllResources"
      :key="resource.id"
      :resource-id="resource.id"
      :name="resource.name"
      :value="resource.currentAmount"
      :max="resource.calculatedStorage"
      :income="resource.totalIncome"
    />
  </div>
</template>

<style scoped>
.resource-panel-container {
  display: flex;
  flex-direction: column;
}
</style>
