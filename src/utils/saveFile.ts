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
    version: '0.0.0-test',
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
  const gameData = localStorage.getItem('gameData')
  return gameData ? (JSON.parse(gameData) as GameData) : null
}

export function hasGameData(): boolean {
  // returns true if gameData detected
  return !!localStorage.getItem('gameData')
}
