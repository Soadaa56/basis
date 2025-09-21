import { defineStore } from 'pinia'
import { gameStateManager } from '@/game/bootstrap'

export const useGameStore = defineStore('game', {
  state: () => ({
    manager: gameStateManager,
  }),
})
