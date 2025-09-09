import type { Resource } from '@/game/models/Resource'

interface ResourceCost {
  id: string
  amount: number
}

export class ResourceSystem {
  private resources: Resource[] = []

  constructor(resources: Resource[]) {
    this.resources = resources
  }

  getResource(targetId: string) {
    return this.resources.find((resource) => resource.id === targetId)
  }

  canAfford(costs: ResourceCost[]): boolean {
    return costs.every((cost) => {
      const resource = this.getResource(cost.id)
      if (!resource) return false
      return resource.currentAmount >= cost.amount
    })
  }

  updateCalculatedStorage(resource: Resource) {
    const baseStorage = resource.baseStorage
    const baseStorageModifiers = resource.baseStorageModifiers

    const calculatedStorage = baseStorageModifiers.reduce(
      (sum, currentValue) => sum * currentValue,
      baseStorage,
    )

    resource.calculatedStorage = calculatedStorage
  }

  updateCalculatedIncome(resource: Resource) {
    const baseIncome = resource.baseIncome
    const baseIncomeModifiers = resource.baseIncomeModifiers

    const calculatedIncome = baseIncomeModifiers.reduce(
      (sum, currentValue) => sum * currentValue,
      baseIncome,
    )

    resource.calculatedIncome = calculatedIncome
  }
}
