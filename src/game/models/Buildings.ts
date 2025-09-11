import type { ResourceCost } from '@/game/models/Costs'
import type { Unlockable } from '@/game/models/Unlockable'

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
} as const

export type BuildingId = (typeof BuildingIds)[keyof typeof BuildingIds]

export interface Building extends Unlockable {
  id: BuildingId
  name: string
  cost: ResourceCost[]
  count: number
  maxCount?: number
  costMultiplier?: number
  workerSlots?: number
}
