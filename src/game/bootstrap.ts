import { loadGameData } from '@/utils/saveFile'
import { GameStateManager } from '@/game/systems/GameStateManager'
import { initialGameState } from './data/initialGameState'

const gameData = loadGameData()
let startingState

if (gameData) {
  startingState = gameData.gameState
} else {
  startingState = initialGameState
}

export const gameStateManager = new GameStateManager(startingState)

if (import.meta.env.DEV) {
  // @ts-expect-error: for debugging only
  window.gameManager = gameStateManager
  console.log(gameStateManager)
}
