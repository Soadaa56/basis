<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const saveFileString = localStorage.getItem('saveFile')

// access to save file for debugging in console
if (saveFileString) {
  const saveFileJson = JSON.parse(saveFileString)
  console.log(saveFileJson)
}

// @ts-expect-error expose gameState for debugging
window.gameStore = gameStore

onMounted(() => {
  // ms, default 1000
  if (gameStore.manager) {
    gameStore.manager.startTick()
  }
})
</script>

<template>
  <router-view />
</template>

<style>
@import './assets/colors.scss';
</style>
