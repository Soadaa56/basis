import { softCap } from '@/game/config/softCaps'

import type { JobId } from '../models/Jobs'
import type { Resource, ResourceId } from '@/game/models/Resource'
import type { ResourceCost } from '@/game/models/Resource'

export class ResourceSystem {
  private resources: Resource[] = []

  constructor(resources: Resource[]) {
    this.resources = resources
  }

  loadResources(resources: Resource[]) {
    this.resources = resources
  }

  getResourceById(id: string) {
    return this.resources.find((resource) => resource.id === id)
  }

  getAllResources(): Resource[] {
    return this.resources
  }

  canAfford(costs: ResourceCost[]): boolean {
    return costs.every((cost) => {
      const resource = this.getResourceById(cost.resourceId)
      if (!resource) return false
      return resource.currentAmount >= cost.amount
    })
  }

  canAffordWithCurrentStorage(costs: ResourceCost[]): boolean {
    return costs.every((cost) => {
      const resource = this.getResourceById(cost.resourceId)
      if (!resource) return false
      return resource.calculatedStorage >= cost.amount
    })
  }

  spendResources(costs: ResourceCost[]) {
    costs.forEach((cost) => {
      const resource = this.getResourceById(cost.resourceId)
      if (!resource) return

      resource.currentAmount -= cost.amount
    })
  }

  updateCalculatedStorage(resource: Resource) {
    const baseStorage = resource.baseStorage
    const baseStorageFlatBonus = resource.baseStorageFlatBonus
    const baseStorageModifiers = resource.baseStorageModifiers

    let calculatedStorage = baseStorageFlatBonus.reduce((sum, currentValue) => sum + currentValue, baseStorage)

    calculatedStorage = baseStorageModifiers.reduce((sum, currentValue) => sum + currentValue, calculatedStorage)

    return (resource.calculatedStorage = calculatedStorage)
  }

  // possibly goes unused, unless meta upgrade gives flat amount? idk
  updateBaseIncome(resource: Resource, incomeAdjustment: number) {
    resource.baseIncome += incomeAdjustment
  }

  addJobContribution(resourceId: ResourceId, jobId: JobId, value: number) {
    const resource = this.getResourceOrError(resourceId)

    resource.incomeSources.jobs[jobId] = value
    this.updateCalculatedIncome(resource)
  }

  updateCalculatedIncome(resource: Resource) {
    const baseIncome = resource.baseIncome
    const incomeMultipliers = Object.values(resource.IncomeMultipliers).reduce((sum, value) => sum * value, 1)
    const incomeSourceJob = Object.values(resource.incomeSources.jobs).reduce((sum, value) => sum + value, 0)
    const incomeSourceBuilding = Object.values(resource.incomeSources.buildings).reduce((sum, value) => sum + value, 0)
    const incomeSources = incomeSourceJob + incomeSourceBuilding
    const flatIncome = baseIncome + incomeSources

    resource.totalIncome = flatIncome * incomeMultipliers
  }

  // Ran on gameTick update
  updateAllResources() {
    this.resources.forEach((resource) => {
      const income = resource.totalIncome
      if (resource.currentAmount > resource.calculatedStorage) {
        const softCapReductionPercentage = this.enforceResourceSoftCaps(resource)
        resource.currentAmount += income * softCapReductionPercentage
      } else {
        resource.currentAmount += income
      }
    })
  }

  // consider lighter or heavier softcaps for resources with resourceDefinitions record
  enforceResourceSoftCaps(resource: Resource): number {
    const resourceFactor: number = resource.currentAmount / resource.calculatedStorage
    let reduction: number = 0
    let factor: number = 1
    let i: number = 0

    while (factor <= resourceFactor && i < softCap.length) {
      factor = softCap[i].factor
      reduction = softCap[i].reduction
      i++
    }

    return 1 - reduction
  }

  private getResourceOrError(resourceId: ResourceId) {
    const resource = this.getResourceById(resourceId)
    if (!resource) {
      throw new Error(`Error at ResourceSystem: resource not found: ${resourceId}`)
    }
    return resource
  }
}
