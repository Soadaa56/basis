import type { BuildingDefinition } from './buildings/buildingsDefinitions'
import type { ResourceCost } from './Resource'

export class Building {
  definition: BuildingDefinition
  count: number = 0
  isUnlocked: boolean = false
  maxCount?: number

  constructor(definition: BuildingDefinition, count = 0, isUnlocked = false) {
    this.definition = definition
    this.count = count
    this.isUnlocked = isUnlocked
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

  unlockBuilding() {
    this.isUnlocked = true
  }
}
