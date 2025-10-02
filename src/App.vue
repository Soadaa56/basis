<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore().manager

// @ts-expect-error expose gameState for debugging
window.gameStore = gameStore

onMounted(() => {
  // ms, default 1000
  gameStore.startTick()
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
