export const ResourceIds = {
  Gold: 'gold',
  Food: 'food',
  Wood: 'wood',
} as const

type ResourceId = (typeof ResourceIds)[keyof typeof ResourceIds]

export interface Resource {
  id: ResourceId
  name: string
  currentAmount: number
  baseStorage: number
  baseStorageModifiers: number[]
  calculatedStorage: number
  baseIncome: number
  baseIncomeModifiers: number[]
  calculatedIncome: number
  lastUpdated?: number // will track time offline
}
