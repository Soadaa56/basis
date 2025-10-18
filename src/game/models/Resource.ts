import type { Unlockable } from '@/game/models/Unlockable'

export const ResourceIds = {
  Gold: 'gold',
  Food: 'food', // might seperate into grain, fish, ect
  Wood: 'wood',
  Plank: 'plank',
  Water: 'water',
  Copper: 'copper',
  Iron: 'iron',
  Research: 'research',
} as const

export type ResourceId = (typeof ResourceIds)[keyof typeof ResourceIds]

export interface ResourceCost {
  resourceId: ResourceId
  amount: number
}

export interface IncomeSources {
  jobs: number
  buildings: number
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
  baseIncomeMultipliers: Record<string, number>
  totalIncome: number
}
