import type { Building } from '@/game/models/Buildings'
import type { ResourceCost } from '@/game/models/ResourceCost'

export class BuildingSystem {
  private buildings: Building[] = []

  constructor(buildings: Building[]) {
    this.buildings = buildings
  }

  getBuilding(id: string) {
    this.buildings.find((building) => building.id === id)
  }
}
