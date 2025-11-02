import type { BuildingDefinition } from './buildings/buildingsDefinitions'
import type { ResourceCost, ResourceId } from './Resource'

export class Building {
  definition: BuildingDefinition
  count: number = 0
  maxCount?: number

  constructor(definition: BuildingDefinition, count = 0) {
    this.definition = definition
    this.count = count
    this.maxCount = this.definition.maxCount
  }

  addBuildingCount() {
    this.count += 1
  }

  getCurrentCost(): ResourceCost[] {
    return this.definition.cost.map((cost) => ({
      resourceId: cost.resourceId,
      amount: Math.floor(cost.amount * Math.pow(this.definition.costMultiplier, this.count ?? 1)),
    }))
  }

  getSingleResourceCostByResourceId(resourceId: ResourceId): number {
    const resource = this.definition.cost.find((cost) => cost.resourceId == resourceId)
    if (!resource) {
      return Infinity
    }
    return resource?.amount
  }
}
