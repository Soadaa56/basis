<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { loadExistingGame } from './game/bootstrap'
import { hasSaveFile } from './utils/saveFile'

const gameStore = useGameStore()

if (hasSaveFile() && !gameStore.manager) {
  const manager = loadExistingGame()
if (manager) gameStore.setManager(manager)
}

onMounted(() => {
  // ms, default 1000
  if (gameStore.manager) {
    gameStore.manager?.startTick()
  }
})
</script>

<template>
  <router-view />
</template>

<style>
@import './assets/colors.scss';
</style>
