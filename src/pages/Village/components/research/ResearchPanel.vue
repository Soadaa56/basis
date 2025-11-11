<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
</script>

<template>
  <h1>Research</h1>
  <div class="research-panel"></div>
</template>

<style scoped lang="scss">
.research-panel {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
