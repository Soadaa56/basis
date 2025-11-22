import { Building } from '@/game/models/Buildings'
import type { GameState, GameStateManager } from '@/game/systems/GameStateManager'

export function restoreGameState(manager: GameStateManager, savedGameState: GameState) {
  console.log(savedGameState)

  manager.gameState.resources = savedGameState.resources.map((r) => ({ ...r }))
  manager.gameState.buildings = savedGameState.buildings.map(
    (b) => new Building(b.definition, b.count),
  )
  manager.gameState.magic = savedGameState.magic.map((magic) => ({ ...magic }))
  manager.gameState.jobs = savedGameState.jobs.map((job) => ({ ...job }))
  manager.gameState.workers = { ...savedGameState.workers }
  manager.gameState.research = savedGameState.research.map((res) => ({
    ...res,
    state: res.state,
  }))
}
