import type { Unlockable } from '@/game/models/Unlockable'

export const ResourceIds = {
  Gold: 'gold',
  Food: 'food', // might seperate into grain, fish, ect
  Wood: 'wood',
  Water: 'water',
  Copper: 'copper',
  Iron: 'iron',
} as const

export type ResourceId = (typeof ResourceIds)[keyof typeof ResourceIds]

export interface Resource extends Unlockable {
  id: ResourceId
  name: string
  currentAmount: number
  baseStorage: number
  baseStorageFlatBonus: number[]
  baseStorageModifiers: number[]
  calculatedStorage: number
  baseIncome: number
  baseIncomeModifiers: number[]
  calculatedIncome: number
}
