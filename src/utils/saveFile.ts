export interface SaveFile {
  createdAt: string
  date: number
  villageName: string
  gameData: string
}

export function newGame(villageName: string) {
  const newSaveFile: SaveFile = {
    createdAt: new Date().toISOString(),
    date: Date.now(),
    villageName: villageName || 'Basis Village',
    gameData: '', // Will keep track of the game dataas JSON, but blank for now.
  }

  localStorage.setItem('saveFile', JSON.stringify(newSaveFile))
}

export function loadSaveFile(): SaveFile | null {
  const rawSaveFile = localStorage.getItem('saveFile')
  return rawSaveFile ? (JSON.parse(rawSaveFile) as SaveFile) : null
}

export function saveGame(saveFile: SaveFile): void {
  localStorage.setItem('saveFile', JSON.stringify(saveFile))
}

export function hasSaveGame(): boolean {
  return !!localStorage.getItem('saveFile')
}
