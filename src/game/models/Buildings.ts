import type { ResourceCost } from '@/game/models/ResourceCost'

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
  /* I'm unsure if I want both BlackSmith & Workshop
     perhaps they will work on different type of upgrades */
  BlackSmith: 'blackSmith',
  WorkShop: 'workShip',
} as const

type BuildingId = (typeof BuildingIds)[keyof typeof BuildingIds]

export interface Building {
  id: BuildingId
  name: string
  cost: ResourceCost[]
  count: number
  maxCount?: number
  costMultiplier?: number
}
