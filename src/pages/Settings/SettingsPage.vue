<script setup lang="ts">
import FooterLayout from '@/components/layouts/FooterLayout.vue'
import { saveGameData, type GameData } from '@/utils/saveFile'
import { serializeGameState } from '@/utils/seralizeGameState'
import { useGameStore } from '@/stores/game'
import router from '@/router'

const gameStore = useGameStore()

// Fast easy way to reset. Will be moved and double confirm to activate.
function resetGameDataButton(): void {
  localStorage.removeItem('gameData')
  router.push('/welcome')
  // removes nav bar (sticks around for some reason). Not ideal solution, more of a 'hack'
  // cannot be used for live release, should only have to connect to page one time (for low internet users).
  window.location.reload()
}

function saveGameDataButton(): void {
  const rawData = localStorage.getItem('gameData')
  const jsonGameData = rawData ? JSON.parse(rawData) : {}
  const gameData: GameData = {
    version: '0.0.0-test-save',
    createdAt: jsonGameData.createdAt || Date.now(),
    updatedAt: Date.now(),
    villageName: jsonGameData.villageName || 'Basis Village',
    gameState: serializeGameState(gameStore.manager.gameState),
  }

  console.log(
    `Game data saved. Version ${gameData.version} for village ${gameData.villageName} at time ${gameData.updatedAt}.`,
  )
  console.log(rawData)
  console.log(jsonGameData)
  saveGameData(gameData)
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
