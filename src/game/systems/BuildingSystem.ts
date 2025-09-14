import { buildingDefinitions } from '@/game/data/buildings'
import { BuildingTypes } from '@/game/data/buildingsInfo'

import type { Building, BuildingId } from '@/game/models/Buildings'
import type { ResourceSystem } from './ResourceSystem'

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

  triggerBuilding(buildingId: BuildingId, resourceSystem: ResourceSystem) {
    const BuildingInfo = buildingDefinitions[buildingId]
    if (!BuildingInfo) return console.log(`triggerBuilding failed. no BuildingInfo ${BuildingInfo}`)
    switch (BuildingInfo?.type) {
      case BuildingTypes.ResourceProducer:
        break

      case BuildingTypes.ResourceMultiplier:
        const resourceId = BuildingInfo.resource
        const multiplier = BuildingInfo.multiplier
        const resource = resourceSystem.getResource(resourceId)

        resource?.baseIncomeModifiers.push(multiplier)
        if (!resource)
          return console.log(
            `triggerBuilding => case: ResourceMultipler problem with !resource ${resource}`,
          )
        resourceSystem.updateCalculatedIncome(resource)
        break

      case BuildingTypes.JobProducer:
        break

      case BuildingTypes.WorkerProducer:
        break

      case BuildingTypes.Unlocker:
        break

      case BuildingTypes.Hybrid:
        break
      default:
        console.log(`triggerBuilding failed with buildingId: ${buildingId}`)
        break
    }
  }
}
