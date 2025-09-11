import { newGameFile, loadSaveFile } from '@/utils/saveFile'
import { GameStateManager } from '@/game/systems/GameStateManager'

let saveFile = loadSaveFile()
if (!saveFile) {
  saveFile = newGameFile('Basis')
}

export const gameStateManager = new GameStateManager(saveFile.gameState)
