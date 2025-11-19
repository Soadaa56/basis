import type { GameState } from '@/game/systems/GameStateManager'
import { initialGameState } from '@/game/data/initialGameState'

export interface GameData {
  createdAt: number
  updatedAt: number
  villageName: string
  gameState: GameState
}

export function newGameFile(villageName: string): GameData {
  const newGameData: GameData = {
    createdAt: Date.now(),
    updatedAt: Date.now(),
    villageName: villageName || 'Basis Village',
    gameState: initialGameState,
  }

  localStorage.setItem('saveFile', JSON.stringify(newGameData))
  return newGameData
}

export function saveGameFile(gameData: GameData): void {
  localStorage.setItem('saveFile', JSON.stringify(gameData))
}

export function loadSaveFile(): GameData | null {
  const rawSaveFile = localStorage.getItem('saveFile')
  return rawSaveFile ? (JSON.parse(rawSaveFile) as GameData) : null
}

export function hasSaveFile(): boolean {
  // returns true if saveFile detected
  return !!localStorage.getItem('saveFile')
}
