<script setup lang="ts">
import router from '@/router'
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const gameData = localStorage.getItem('gameData')

onMounted(() => {
  // ms, default 1000
  if (gameStore.manager) {
    gameStore.manager.startTick()
  }
  if (!gameData) {
    router.push('welcome')
  }
})
</script>

<template>
  <router-view />
</template>

<style>
@import './assets/colors.scss';
</style>
