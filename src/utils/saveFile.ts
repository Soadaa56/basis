import type { GameState } from '@/game/systems/GameStateManager'
import { initialGameState } from '@/game/data/initialGameState'

export interface SaveFile {
  version: string
  createdAt: string
  date: number
  villageName: string
  gameState: GameState
}

function replacer(key: string, value: unknown) {
  return value === Infinity ? "_Infinity" : value
}

function addBackIn(key: string, value: unknown) {
  return value === "_Infinity" ? Infinity : value
}

export function newGameFile(villageName: string): SaveFile {
  const newSaveFile: SaveFile = {
    version: "a0.0.1",
    createdAt: new Date().toISOString(),
    date: Date.now(),
    villageName: villageName || 'Basis Village',
    gameState: initialGameState,
  }

  localStorage.setItem('saveFile', JSON.stringify(newSaveFile))
  return newSaveFile
}

export function saveGameFile(saveFile: SaveFile): void {
  localStorage.setItem('saveFile', JSON.stringify(saveFile, replacer))
}

export function loadSaveFile(): SaveFile | null {
  const rawSaveFile = localStorage.getItem('saveFile')
  return rawSaveFile ? (JSON.parse(rawSaveFile, addBackIn) as SaveFile) : null
}

export function hasSaveFile(): boolean {
  // returns true if saveFile detected
  return !!localStorage.getItem('saveFile')
}
