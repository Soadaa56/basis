import { buildingDefinitions } from '@/game/data/buildings'
import { BuildingTypes } from '@/game/data/buildingsInfo'
import { JobSystem } from './JobSystem'
import { WorkerSystem } from './WorkerSystem'
import { ResourceSystem } from './ResourceSystem'

import type { Building, BuildingId } from '@/game/models/Buildings'

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

  incrementBuilding(buildingId: BuildingId) {
    const building = this.getBuilding(buildingId)
    if (building) {
      building.count++
      this.updateBuildingCost(building)
    } else {
      console.log(`Could not run incrementBuilding: ${buildingId} does not exist`)
    }
  }

  triggerBuilding(
    buildingId: BuildingId,
    resourceSystem: ResourceSystem,
    jobSystem: JobSystem,
    workerSystem: WorkerSystem,
  ) {
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
        const jobId = BuildingInfo.jobType
        const numberofJobs = BuildingInfo.addOpenJobs

        jobSystem.addJobSlots(jobId, numberofJobs)
        break

      case BuildingTypes.WorkerProducer:
        const newWorkers = BuildingInfo.addWorkers

        workerSystem.increaseMaxWorkerCount(newWorkers)
        break

      case BuildingTypes.Unlocker:
        console.log(`triggerBuilding => case:BuildingTypes.unlocker: ${BuildingTypes.Unlocker}`)
        break

      case BuildingTypes.Hybrid:
        console.log(`BuildingInfo => case: Hybrid is being run. BuildingId: ${buildingId}`)
        break
      default:
        console.log(`triggerBuilding failed with buildingId: ${buildingId}`)
        break
    }
  }
}
