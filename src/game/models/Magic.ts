// Unsure if this will just be mana or 2-3 'mystical' resources
export const MagicIds = {
  Mana: 'mana',
  Ki: 'ki',
} as const

type MagicId = (typeof MagicIds)[keyof typeof MagicIds]

export interface Magic {
  id: MagicId
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
