<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'

const gameState = useGameStore().manager

// @ts-expect-error expose gameState for debugging
window.gameState = gameState

onMounted(() => {
  // ms, default 1000
  gameState.startTick()
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
