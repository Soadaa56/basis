import type { Resource } from '@/game/models/Resource'
import type { ResourceCost } from '@/game/models/Costs'

export class ResourceSystem {
  private resources: Resource[] = []

  constructor(resources: Resource[]) {
    this.resources = resources
  }

  getResource(id: string) {
    return this.resources.find((resource) => resource.id === id)
  }

  canAfford(costs: ResourceCost[]): boolean {
    return costs.every((cost) => {
      const resource = this.getResource(cost.id)
      if (!resource) return false
      return resource.currentAmount >= cost.amount
    })
  }

  spendResources(costs: ResourceCost[]) {
    costs.forEach((cost) => {
      const resource = this.getResource(cost.id)
      if (!resource) return

      resource.currentAmount -= cost.amount
    })
  }

  updateCalculatedStorage(resource: Resource) {
    const baseStorage = resource.baseStorage
    const baseStorageModifiers = resource.baseStorageModifiers

    const calculatedStorage = baseStorageModifiers.reduce(
      (sum, currentValue) => sum * currentValue,
      baseStorage,
    )

    return (resource.calculatedStorage = calculatedStorage)
  }

  updateBaseIncome(resource: Resource, incomeAdjustment: number) {
    return (resource.baseIncome += incomeAdjustment)
  }

  updateCalculatedIncome(resource: Resource) {
    const baseIncome = resource.baseIncome
    const baseIncomeModifiers = resource.baseIncomeModifiers

    const calculatedIncome = baseIncomeModifiers.reduce(
      (sum, currentValue) => sum * currentValue,
      baseIncome,
    )

    return (resource.calculatedIncome = calculatedIncome)
  }
}
