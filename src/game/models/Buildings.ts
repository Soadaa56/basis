import type { Unlockable } from '@/game/models/Unlockable'
import type { ResourceId } from '@/game/models/Resource'
import type { BuildingType } from '@/game/data/buildingsInfo'

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

export interface BuildingCost {
  resource: ResourceId
  amount: number
}

export interface Building extends Unlockable {
  id: BuildingId
  name: string
  type: BuildingType
  cost: BuildingCost[]
  count: number
  maxCount?: number
  costMultiplier: number
}
