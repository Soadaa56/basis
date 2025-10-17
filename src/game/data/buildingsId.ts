export const BuildingIds = {
  Farm: 'farm',
  Hut: 'hut',
  Market: 'market',
  LoggingCamp: 'loggingCamp',
  FishingCamp: 'fishingCamp',
  StorageShed: 'storageShed',
  Granary: 'granery',
  Mine: 'mine',
  Sawmill: 'sawmill',
  Well: 'well',
  TownHall: 'townHall',
  BlackSmith: 'blackSmith',
  WorkShop: 'workShip',
  WizardTower: 'wizardTower',
  Bakehouse: 'bakehouse',
} as const

export type BuildingId = (typeof BuildingIds)[keyof typeof BuildingIds]
