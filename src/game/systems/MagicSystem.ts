import type { Magic } from '@/game/models/Magic'
import type { MagicCost } from '../models/Costs'

export class MagicSystem {
  private magic: Magic[] = []
  constructor(magic: Magic[]) {
    this.magic = magic
  }

  getMagic(id: string) {
    return this.magic.find((magic) => magic.id === id)
  }

  canAfford(costs: MagicCost[]): boolean {
    return costs.every((cost) => {
      const magic = this.getMagic(cost.id)
      if (!magic) return false
      return magic.currentAmount >= cost.amount
    })
  }

  spendMagic(costs: MagicCost[]) {
    costs.forEach((cost) => {
      const magic = this.getMagic(cost.id)
      if (!magic) return

      magic.currentAmount -= cost.amount
    })
  }

  updateCalculatedStorage(magic: Magic) {
    const baseStorage = magic.baseStorage
    const baseStorageFlatBonus = magic.baseStorageFlatBonus
    const baseStorageModifiers = magic.baseStorageModifiers

    let calculatedStorage = baseStorageFlatBonus.reduce(
      (sum, currentValue) => sum + currentValue,
      baseStorage,
    )
    calculatedStorage = baseStorageModifiers.reduce(
      (sum, currentValue) => sum * currentValue,
      calculatedStorage,
    )

    return (magic.calculatedStorage = calculatedStorage)
  }

  updateBaseIncome(magic: Magic, incomdeAdjustment: number) {
    return (magic.baseIncome += incomdeAdjustment)
  }

  updateCalculatedIncome(magic: Magic) {
    const baseIncome = magic.baseIncome
    const baseIncomeModifiers = magic.baseIncomeModifiers

    const calculatedIncome = baseIncomeModifiers.reduce(
      (sum, currentValue) => sum * currentValue,
      baseIncome,
    )

    return (magic.calculatedIncome = calculatedIncome)
  }
}
