import { loadGameData } from '@/utils/saveFile'
import { GameStateManager } from '@/game/systems/GameStateManager'
import { initialGameState } from './data/initialGameState'
import { restoreGameState } from '@/utils/restoreGameState'

export const gameStateManager = new GameStateManager(initialGameState)

const gameData = loadGameData()
if (gameData) {
  restoreGameState(gameStateManager, gameData.gameState)
}

if (import.meta.env.DEV) {
  // @ts-expect-error: for debugging only
  window.gameManager = gameStateManager
  console.log(gameStateManager)
}
