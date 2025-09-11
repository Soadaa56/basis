import type { GameState } from '@/game/systems/GameStateManager'
import { initialGameState } from '@/game/data/initialGameState'

export interface SaveFile {
  createdAt: string
  date: number
  villageName: string
  gameState: GameState
}

export function newGame(villageName: string) {
  const newSaveFile: SaveFile = {
    createdAt: new Date().toISOString(),
    date: Date.now(),
    villageName: villageName || 'Basis Village',
    gameState: initialGameState,
  }

  localStorage.setItem('saveFile', JSON.stringify(newSaveFile))
  return newSaveFile
}

export function loadSaveFile(): SaveFile | null {
  const rawSaveFile = localStorage.getItem('saveFile')
  return rawSaveFile ? (JSON.parse(rawSaveFile) as SaveFile) : null
}

export function saveGame(saveFile: SaveFile): void {
  localStorage.setItem('saveFile', JSON.stringify(saveFile))
}

export function hasSaveFile(): boolean {
  // returns true if saveFile detected
  return !!localStorage.getItem('saveFile')
}
