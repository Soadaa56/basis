export interface SaveFile {
  createdAt: string
  date: number
  villageName: string
  gameData: string
}

export function newGame(villageName: string) {
  const basisSaveFile: SaveFile = {
    createdAt: new Date().toISOString(),
    date: Date.now(),
    villageName: villageName || 'Basis Village',
    gameData: '', // Will keep track of the game dataas JSON, but blank for now.
  }

  localStorage.setItem('saveFile', JSON.stringify(basisSaveFile))
}

export function saveGame(): SaveFile {}

export function loadSaveFile(): SaveFile | null {
  const rawSaveFile = localStorage.getItem('saveFile')
  return rawSaveFile ? (JSON.parse(rawSaveFile) as SaveFile) : null
}
