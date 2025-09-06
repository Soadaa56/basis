export interface SaveFile {
  createdAt: string
  date: number
  villageName: string
  id: number
}

export function newGame(villageName: string) {
  const basisSaveFile: SaveFile = {
    createdAt: new Date().toISOString(),
    date: Date.now(),
    villageName: villageName || 'Basis Village',
    id: 1,
  }

  localStorage.setItem('saveFile', JSON.stringify(basisSaveFile))
}

export function loadSaveFile(): SaveFile | null {
  const rawSaveFile = localStorage.getItem('saveFile')
  return rawSaveFile ? (JSON.parse(rawSaveFile) as SaveFile) : null
}
