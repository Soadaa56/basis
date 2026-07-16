import { loadSaveFile } from '@/utils/saveFile'
import { GameStateManager } from '@/game/systems/GameStateManager'
import { initialGameState } from './data/initialGameState'

export function loadExistingGame(): GameStateManager | null {
  const saveFile = loadSaveFile()
  if (!saveFile) return null
  return new GameStateManager(saveFile.gameState)
}

export function startNewGame(): GameStateManager {
  return new GameStateManager(structuredClone(initialGameState))
}
