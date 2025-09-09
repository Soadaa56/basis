export interface Resource {
  id: string
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
