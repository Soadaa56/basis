import { loadSaveFile } from '@/utils/saveFile'
import { GameStateManager } from '@/game/systems/GameStateManager'

const saveFile = loadSaveFile()

export const gameStateManager = saveFile ? new GameStateManager(saveFile.gameState) : null
