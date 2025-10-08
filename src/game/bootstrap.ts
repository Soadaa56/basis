import { loadSaveFile } from '@/utils/saveFile'
import { GameStateManager } from '@/game/systems/GameStateManager'
import { initialGameState } from './data/initialGameState'

const saveFile = loadSaveFile()

export const gameStateManager = new GameStateManager(
  saveFile ? saveFile.gameState : initialGameState,
)

if (import.meta.env.DEV) {
  // @ts-expect-error: for debugging only
  window.gameManager = gameStateManager
}
