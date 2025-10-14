import type { Unlockable } from '@/game/models/Unlockable'
import type { ResourceId } from '@/game/models/Resource'

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
  WizardTower: 'wizardTower',
  Bakehouse: 'bakehouse',
} as const

export type BuildingId = (typeof BuildingIds)[keyof typeof BuildingIds]

export interface BuildingCost {
  resourceId: ResourceId
  resourceAmount: number
}

export interface Building extends Unlockable {
  id: BuildingId
  name: string
  cost: BuildingCost[]
  count: number
  maxCount?: number
  costMultiplier?: number
  workerSlots?: number
}
