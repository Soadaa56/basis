export const ResourceIds = {
  Copper: 'copper',
  Food: 'food',
  Gold: 'gold',
  Iron: 'iron',
  Knowledge: 'knowledge',
  Plank: 'plank',
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

export interface Resource {
  id: ResourceId
  name: string
  currentAmount: number
  baseStorage: number
  baseStorageFlatBonus: Record<string, number>
  baseStorageMults: Record<string, number>
  calculatedStorage: number
  baseIncome: number
  incomeSources: IncomeSources
  incomeMultipliers: Record<string, number>
  totalIncome: number
}
