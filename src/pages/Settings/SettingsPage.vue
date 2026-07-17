<script setup lang="ts">
import FooterLayout from '@/components/layouts/FooterLayout.vue'
import { useGameStore } from '@/stores/game'
import { saveGameFile } from '@/utils/saveFile';
import { loadSaveFile } from '@/utils/saveFile';
import type { SaveFile } from '@/utils/saveFile';

const gameStore = useGameStore()

function saveGameButton() {
  if (!gameStore.manager) return // Satisfy possibly null value on gameState

  const localStorageSaveFile = loadSaveFile()
    const updatedSaveFile: SaveFile = {
      version: localStorageSaveFile?.version || 'a.0.0.1', // Create method eventually
      createdAt: localStorageSaveFile?.createdAt || '',
      date: Date.now(),
      villageName: localStorageSaveFile?.villageName || 'Basis Village',
      gameState: gameStore.manager.getGameState(),
    }

    saveGameFile(updatedSaveFile)
}

// Fast easy way to reset, will be moved and confirmation window added
function resetGameButton() {
  localStorage.removeItem('saveFile')
  window.location.reload()
}
</script>

<template>
  <h1>Settings</h1>

  <button id="save-button" @click="saveGameButton">Save Game</button>
  <button id="reset-button" @click="resetGameButton">Reset Game Data</button>

  <footer-layout />
</template>

<style scoped>
h1 {
  margin: 1rem;
  font-size: 3rem;
}
button {
  font-size: 1.2rem;
  margin: 16px;
  padding: 16px;
  transition: 0.3s ease-out;

  &:hover {
    color: var(--main-color);
    filter: brightness(1.25);
  }
}

#reset-button {
  border: 4px dashed darkred;
}
</style>
