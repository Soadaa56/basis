import { defineStore } from 'pinia'
import { GameStateManager } from '@/game/systems/GameStateManager'

export const useGameStore = defineStore('game', {
  state: () => ({
    manager: null as GameStateManager | null,
  }),
  actions: {
    setManager(manager: GameStateManager) {
      this.manager = manager
      if (import.meta.env.DEV) {
        // @ts-expect-error: debugging only
        window.gameManager = manager
      }
    }
  }
})
