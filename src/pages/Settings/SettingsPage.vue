<script setup lang="ts">
import FooterLayout from '@/components/layouts/FooterLayout.vue'
import { saveGameData, type GameData } from '@/utils/saveFile'
import { useGameStore } from '@/stores/game'
import router from '@/router'

const gameStore = useGameStore()

// Fast easy way to reset. Will be moved and double confirm to activate.
function resetGameDataButton(): void {
  localStorage.removeItem('gameData')
  router.push('/welcome')
}

function saveGameDataButton(): void {
  const rawData = localStorage.getItem('gameData')
  const jsonGameData = rawData ? JSON.parse(rawData) : {}
  const gameData: GameData = {
    version: '0.0.0-test',
    createdAt: jsonGameData.createdAt || Date.now(),
    updatedAt: Date.now(),
    villageName: jsonGameData.villageName || 'Basis Village',
    gameState: gameStore.manager.gameState,
  }

  console.log(
    `Game data saved. Version ${gameData.version} for village ${gameData.villageName} at time ${gameData.updatedAt}.`,
  )
  saveGameData(gameData)
  router.push('/')
}
</script>

<template>
  <h1>Settings</h1>

  <button id="save-button" @click="saveGameDataButton">Save Game</button>

  <button id="reset-button" @click="resetGameDataButton">Reset Game Data</button>

  <footer-layout />
</template>

<style scoped>
button {
  margin: 16px;
  padding: 16px;
}

#reset-button {
  border: 4px dashed darkred;
}
</style>
