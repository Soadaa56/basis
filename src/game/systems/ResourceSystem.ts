import type { Resource } from '@/game/models/Resource'
import type { ResourceCost } from '@/game/models/Costs'
import { softCap } from '@/game/config/softCaps'

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
    const baseStorageFlatBonus = resource.baseStorageFlatBonus
    const baseStorageModifiers = resource.baseStorageModifiers

    let calculatedStorage = baseStorageFlatBonus.reduce(
      (sum, currentValue) => sum + currentValue,
      baseStorage,
    )

    calculatedStorage = baseStorageModifiers.reduce(
      (sum, currentValue) => sum + currentValue,
      calculatedStorage,
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

  // Ran on gameTick update
  updateAllResources() {
    this.resources.forEach((resource) => {
      const income = resource.calculatedIncome
      if (resource.currentAmount > resource.calculatedStorage) {
        this.enforceResourceSoftCaps(resource)
      } else {
        resource.currentAmount += income
      }
    })
  }

  enforceResourceSoftCaps(resource: Resource) {
    // consider lighter or heavier softcaps for resources with resourceDefinitions record
  }
}
