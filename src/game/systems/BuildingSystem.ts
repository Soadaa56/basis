import { BuildingTypes } from '@/game/models/buildings/buildingsInfo'
import { JobSystem } from './JobSystem'
import { WorkerSystem } from './WorkerSystem'
import { ResourceSystem } from './ResourceSystem'

import type { Building } from '@/game/models/Buildings'
import type { BuildingId } from '@/game/data/buildingsId'

export class BuildingSystem {
  private buildings: Building[] = []

  constructor(buildings: Building[]) {
    this.buildings = buildings
  }

  loadBuildings(buildings: Building[]) {
    this.buildings = buildings
  }

  getAllBuildings() {
    return this.buildings
  }

  getBuilding(id: string) {
    const building = this.buildings.find((building) => building.definition.id === id)
    if (!building) console.warn(`BuildingSystem: building ${id} not found`)
    return building
  }

  hasBuilding(id: string) {
    const building = this.getBuilding(id)
    return building ? true : false
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
      default:
        console.log(`triggerBuilding failed with buildingId: ${buildingId}`)
        break
    }
  }
}
