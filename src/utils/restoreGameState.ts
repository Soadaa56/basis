import { useGameStore } from '@/stores/game'
import { Building } from '@/game/models/Buildings'
import type { GameState } from '@/game/systems/GameStateManager'

export function restoreGameState(savedGameState: GameState) {
  const gameStore = useGameStore()

  gameStore.manager.gameState.resources = savedGameState.resources.map((r) => ({ ...r }))
  gameStore.manager.gameState.buildings = savedGameState.buildings.map(
    (b) => new Building(b.definition, b.count),
  )
  gameStore.manager.gameState.magic = savedGameState.magic.map((magic) => ({ ...magic }))
  gameStore.manager.gameState.jobs = savedGameState.jobs.map((job) => ({ ...job }))
  gameStore.manager.gameState.workers = { ...savedGameState.workers }
  gameStore.manager.gameState.research = savedGameState.research.map((res) => ({
    ...res,
    state: res.state,
  }))
}
