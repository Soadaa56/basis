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

  public get getAllResources(): Resource[] {
    return this.resources
  }

  getResourceById(id: string) {
    return this.resources.find((resource) => resource.id === id)
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
    const baseStorageFlatBonus = Object.values(resource.baseStorageFlatBonus).reduce(
      (sum, value) => sum + value,
      0,
    )
    const baseStorageModifiers = Object.values(resource.baseStorageModifiers).reduce(
      (sum, value) => sum * value,
      1,
    )
    const storageFlat = baseStorage + baseStorageFlatBonus
    console.log(baseStorage, baseStorageFlatBonus, baseStorageModifiers, storageFlat)

    resource.calculatedStorage = storageFlat * baseStorageModifiers
  }

  updateBaseIncome(resource: Resource, incomeAdjustment: number) {
    resource.baseIncome += incomeAdjustment
    this.updateCalculatedIncome(resource)
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
    const incomeSourceBuilding = Object.values(resource.incomeSources.buildings).reduce(
      (sum, value) => sum + value,
      0,
    )
    const incomeSources = incomeSourceJob + incomeSourceBuilding
    const flatIncome = baseIncome + incomeSources

    resource.totalIncome = flatIncome * incomeMultipliers
  }

  // Ran on gameTick update
  updateAllResources() {
    this.resources.forEach((resource) => {
      const income = resource.totalIncome
      if (resource.currentAmount >= resource.calculatedStorage) {
        return
      } else {
        resource.currentAmount += income
      }
    })
  }

  // Deciding against this idea as a base mechanic
  // *might* use on specific resources or a meta upgrade
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

  ensureResourceExists(resourceId: ResourceId) {
    if (this.doesResourceExist(resourceId)) {
      return this.getResourceById(resourceId)
    }

    const newResource: Resource = {
      id: resourceId,
      name: resourceId.charAt(0).toUpperCase() + resourceId.slice(1),
      currentAmount: 0,
      baseStorage: 100,
      baseStorageFlatBonus: {},
      baseStorageModifiers: {},
      calculatedStorage: 100,
      baseIncome: 0,
      incomeSources: {
        jobs: {},
        buildings: {},
      },
      IncomeMultipliers: {},
      totalIncome: 0,
    }

    this.resources.push(newResource)
    return this.getResourceById(resourceId)
  }

  doesResourceExist(resourceId: ResourceId) {
    if (this.resources.find((resource) => resource.id === resourceId)) {
      return true
    }
    return false
  }

  private getResourceOrError(resourceId: ResourceId) {
    const resource = this.getResourceById(resourceId)
    if (!resource) {
      throw new Error(`Error at ResourceSystem: resource not found: ${resourceId}`)
    }
    return resource
  }
}
