import { softCap } from '@/game/config/softCaps'
import type { Resource, ResourceId } from '@/game/models/Resource'
import type { ResourceCost } from '@/game/models/Resource'
import type { BuildingId } from '../data/buildingsId'
import type { JobId } from '../models/Jobs'

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

  getResourceById(resourceId: ResourceId) {
    return this.resources.find((resource) => resource.id === resourceId)
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

  // Could make resourceInfos if this need more flexibility
  createNewResource(resourceId: ResourceId): void {
    const newResource: Resource = {
      id: resourceId,
      name: resourceId.charAt(0).toUpperCase() + resourceId.slice(1),
      currentAmount: 0,
      baseStorage: 100,
      baseStorageFlatBonus: {},
      baseStorageMults: {},
      calculatedStorage: 100,
      baseIncome: 0,
      incomeSources: {
        jobs: {},
        buildings: {},
      },
      incomeMultipliers: {},
      totalIncome: 0,
    }

    this.resources.push(newResource)
  }

  doesResourceExist(resourceId: ResourceId): boolean {
    if (this.resources.find((resource) => resource.id === resourceId)) {
      return true
    }
    return false
  }

  ensureResourceExists(resourceId: ResourceId): void {
    if (this.doesResourceExist(resourceId)) return
    this.createNewResource(resourceId)
  }

  canAfford(costs: ResourceCost[]): boolean {
    return costs.every((cost) => {
      const resource = this.getResourceById(cost.resourceId)
      if (!resource) return false
      return resource.currentAmount >= cost.amount
    })
  }

  spendResources(costs: ResourceCost[]) {
    costs.forEach((cost) => {
      const resource = this.getResourceById(cost.resourceId)
      if (!resource) return

      resource.currentAmount -= cost.amount
    })
  }

  canAffordSingleCost(cost: ResourceCost): boolean {
    const resource = this.getResourceById(cost.resourceId)
    if (!resource) return false
    return resource.currentAmount >= cost.amount
  }

  canAffordWithCurrentStorage(costs: ResourceCost[]): boolean {
    return costs.every((cost) => {
      const resource = this.getResourceById(cost.resourceId)
      if (!resource) return false
      return resource.calculatedStorage >= cost.amount
    })
  }

  updateBaseIncome(resourceId: ResourceId, incomeAdjustment: number): void {
    const resource = this.getResourceOrError(resourceId)
    resource.baseIncome += incomeAdjustment
    this.updateCalculatedIncome(resource.id)
  }

  updateBuildingIncome(
    resourceId: ResourceId,
    income: number,
    BuildingId: BuildingId,
    count: number,
  ): void {
    const resource = this.getResourceOrError(resourceId)

    resource.incomeSources.buildings[BuildingId] = income * count
    this.updateCalculatedIncome(resourceId)
  }

  updateBuildingMult(
    resourceId: ResourceId,
    mult: number,
    BuildingId: BuildingId,
    count: number,
  ): void {
    const resource = this.getResourceOrError(resourceId)

    resource.incomeMultipliers[BuildingId] = Math.pow(mult, count)
    this.updateCalculatedIncome(resourceId)
  }

  updateResearchMult(resourceId: ResourceId, mult: number): void {
    const resource = this.getResourceOrError(resourceId)
    const currentResearchMult = (resource.incomeMultipliers['research'] ?? [1]) * mult

    resource.incomeMultipliers['research'] = currentResearchMult
    this.updateCalculatedIncome(resourceId)
  }

  addJobContribution(resourceId: ResourceId, jobId: JobId, value: number) {
    const resource = this.getResourceOrError(resourceId)

    resource.incomeSources.jobs[jobId] = value
    this.updateCalculatedIncome(resource.id)
  }

  updateCalculatedIncome(resourceId: ResourceId) {
    const resource = this.getResourceOrError(resourceId)
    const baseIncome = resource.baseIncome
    const incomeMultipliers = Object.values(resource.incomeMultipliers).reduce(
      (sum, value) => sum * value,
      1,
    )
    const incomeSourceJob = Object.values(resource.incomeSources.jobs).reduce(
      (sum, value) => sum + value,
      0,
    )
    const incomeSourceBuilding = Object.values(resource.incomeSources.buildings).reduce(
      (sum, value) => sum + value,
      0,
    )
    const incomeSources = incomeSourceJob + incomeSourceBuilding
    const flatIncome = baseIncome + incomeSources

    resource.totalIncome = flatIncome * incomeMultipliers
  }

  updateBaseStorage(resource: Resource, storageAdjustment: number) {
    resource.baseStorage += storageAdjustment
    this.updateCalculatedStorage(resource.id)
  }

  updateStorage(
    resourceId: ResourceId,
    buildingId: BuildingId,
    count: number,
    options: { flat?: number; mult?: number },
  ): void {
    const { flat, mult } = options
    const resource = this.getResourceById(resourceId)
    if (!resource) return

    if (flat) {
      resource.baseStorageFlatBonus[buildingId] = flat * count
    }

    if (mult) {
      resource.baseStorageMults[buildingId] = Math.pow(mult, count)
    }

    this.updateCalculatedStorage(resourceId)
  }

  updateCalculatedStorage(resourceId: ResourceId): void {
    const resource = this.getResourceOrError(resourceId)

    const baseStorage = resource.baseStorage
    const baseStorageFlatBonus = Object.values(resource.baseStorageFlatBonus).reduce(
      (sum, value) => sum + value,
      0,
    )
    const baseStorageMults = Object.values(resource.baseStorageMults).reduce(
      (sum, value) => sum * value,
      1,
    )
    const storageFlat = baseStorage + baseStorageFlatBonus
    console.log(baseStorage, baseStorageFlatBonus, baseStorageMults, storageFlat)

    resource.calculatedStorage = storageFlat * baseStorageMults
  }

  //  Not using as base mechanic anymore. Maybe as meta upgrade
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
