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

  updateBuildingCost(building: Building) {
    building.cost.forEach((cost) => {
      if (!building.costMultiplier) return
      return (cost.amount *= building.costMultiplier)
    })
  }

  incrementBuilding(buildingId: string) {
    const building = this.getBuilding(buildingId)
    if (building) {
      building.count++
      this.updateBuildingCost(building)
    } else {
      console.log(`Could not run incrementBuilding: ${buildingId} does not exist`)
    }
  }
}
