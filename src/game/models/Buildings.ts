import type { BuildingDefinition } from './buildings/buildingsDefinitions'

export class Building {
  definition: BuildingDefinition
  count: number = 0
  isUnlocked: boolean = false

  constructor(definition: BuildingDefinition, count = 0, isUnlocked = false) {
    this.definition = definition
    this.count = count
    this.isUnlocked = isUnlocked
  }
}
