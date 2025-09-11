import type { Building } from '@/game/models/Buildings'
import type { ResourceCost } from '@/game/models/ResourceCost'

export class BuildingSystem {
  private buildings: Building[] = []

  constructor(buildings: Building[]) {
    this.buildings = buildings
  }

  getBuilding(id: string) {
    return this.buildings.find((building) => building.id === id)
  }

  hasBuilding(buildingId: string) {
    const building = this.getBuilding(buildingId)
    return building ? true : false
  }

  incrementBuilding(buildingId: string) {
    const building = this.getBuilding(buildingId)
    if (building) {
      building.count++
    } else {
      console.log(`Could not run incrementBuilding: ${buildingId} does not exist`)
    }
  }
}
