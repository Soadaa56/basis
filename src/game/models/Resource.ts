import type { Unlockable } from '@/game/models/Unlockable'

export const ResourceIds = {
  Copper: 'copper',
  Food: 'food',
  Gold: 'gold',
  Iron: 'iron',
  Plank: 'plank',
  Research: 'research',
  Stone: 'stone',
  Water: 'water',
  Wood: 'wood',
} as const

export type ResourceId = (typeof ResourceIds)[keyof typeof ResourceIds]

export interface ResourceCost {
  resourceId: ResourceId
  amount: number
}

export interface IncomeSources {
  jobs: Record<string, number>
  buildings: Record<string, number>
}

export interface Resource extends Unlockable {
  id: ResourceId
  name: string
  currentAmount: number
  baseStorage: number
  baseStorageFlatBonus: Record<string, number>
  baseStorageModifiers: Record<string, number>
  calculatedStorage: number
  baseIncome: number // probably zero for almost all?
  incomeSources: IncomeSources
  IncomeMultipliers: Record<string, number>
  totalIncome: number
}
