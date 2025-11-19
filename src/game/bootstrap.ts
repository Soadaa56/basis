import { loadGameData } from '@/utils/saveFile'
import { GameStateManager } from '@/game/systems/GameStateManager'
import { initialGameState } from './data/initialGameState'

const gameData = loadGameData()

export const gameStateManager = new GameStateManager(
  gameData ? gameData.gameState : initialGameState,
)

if (import.meta.env.DEV) {
  // @ts-expect-error: for debugging only
  window.gameManager = gameStateManager
}
