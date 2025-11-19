import type { GameState } from '@/game/systems/GameStateManager'
import { initialGameState } from '@/game/data/initialGameState'

export interface GameData {
  version: string
  createdAt: number
  updatedAt: number
  villageName: string
  gameState: GameState
}

export function newGameData(villageName: string): GameData {
  const newGameData: GameData = {
    version: 'alpha-v-0.0.1',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    villageName: villageName || 'Basis Village',
    gameState: initialGameState,
  }

  localStorage.setItem('gameData', JSON.stringify(newGameData))
  return newGameData
}

export function saveGameData(gameData: GameData): void {
  localStorage.setItem('gameData', JSON.stringify(gameData))
}

export function loadGameData(): GameData | null {
  const rawSaveFile = localStorage.getItem('saveFile')
  return rawSaveFile ? (JSON.parse(rawSaveFile) as GameData) : null
}

export function hasGameData(): boolean {
  // returns true if saveFile detected
  return !!localStorage.getItem('saveFile')
}
