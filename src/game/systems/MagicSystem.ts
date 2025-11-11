import type { Magic } from '@/game/models/Magic'

export class MagicSystem {
  private magics: Magic[] = []

  constructor(magics: Magic[]) {
    this.magics = magics
  }

  loadMagic(magics: Magic[]) {
    this.magics = magics
  }

  public get getAllMagic(): Magic[] {
    return this.magics
  }

  getMagic(id: string) {
    return this.magics.find((magic) => magic.id === id)
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

    const calculatedIncome = baseIncomeModifiers.reduce((sum, currentValue) => sum * currentValue, baseIncome)

    return (magic.calculatedIncome = calculatedIncome)
  }
}
