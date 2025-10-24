export const BuildingIds = {
  Bakehouse: 'bakehouse',
  BlackSmith: 'blackSmith',
  Farm: 'farm',
  FishingCamp: 'fishingCamp',
  Granary: 'granary',
  Hut: 'hut',
  LoggingCamp: 'loggingCamp',
  Market: 'market',
  Mill: 'mill',
  Mine: 'mine',
  StorageShed: 'storageShed',
  Sawmill: 'sawmill',
  TownHall: 'townHall',
  Well: 'well',
  WizardTower: 'wizardTower',
  WorkShop: 'workShop',
} as const

export type BuildingId = (typeof BuildingIds)[keyof typeof BuildingIds]
