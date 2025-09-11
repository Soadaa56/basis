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
}
