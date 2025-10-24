import { BuildingTypes } from '@/game/models/buildings/buildingsInfo'
import { JobSystem } from './JobSystem'
import { WorkerSystem } from './WorkerSystem'
import { ResourceSystem } from './ResourceSystem'

import type { Building } from '@/game/models/Buildings'
import { jobDefinitions } from '../data/jobs'
import type { BuildingId } from '../data/buildingsId'

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

  hasBuilding(buildingId: BuildingId) {
    const building = this.getBuildingOrError(buildingId)
    return building ? true : false
  }

  getBuildingOrError(buildingId: BuildingId) {
    const building = this.buildings.find((building) => building.definition.id == buildingId)
    if (!building) {
      throw new Error(`BuildingSystem => getBuildingOrError on buildingId: ${buildingId}`)
    }
    return building
  }

  triggerBuilding(
    building: Building,
    resourceSystem: ResourceSystem,
    jobSystem: JobSystem,
    workerSystem: WorkerSystem,
  ) {
    building.definition.info.forEach((effect) => {
      switch (effect.type) {
        case BuildingTypes.ResourceProducer: {
          const resource = resourceSystem.getResourceById(effect.resourceId)
          const buildingId = building.definition.id
          const rate = effect.rate * building.count

          if (!resource) return
          resource.incomeSources.buildings[buildingId] = rate
          break
        }
        case BuildingTypes.ResourceMultiplier: {
          const resource = resourceSystem.getResourceById(effect.resourceId)
          const buildingId = building.definition.id
          const count = building.count
          const totalMult = Math.pow(effect.multiplier, count)

          if (!resource) return

          resource.IncomeMultipliers[buildingId] = totalMult
          break
        }

        case BuildingTypes.ResourceStorage: {
          const resource = resourceSystem.getResourceById(effect.resourceId)
          const buildingId = building.definition.id

          if (!resource) {
            console.warn(`triggerBuilding error => resourceStorage Resource: ${resource}`)
            return
          }

          if (effect.flatStorageAmount) {
            resource.baseStorageFlatBonus[buildingId] = effect.flatStorageAmount * building.count
          }
          if (effect.modifierStorageAmount) {
            resource.baseStorageModifiers[buildingId] = effect.modifierStorageAmount * building.count
          }
          break
        }
        case BuildingTypes.JobMultiplierOutput: {
          const jobInfo = jobDefinitions[effect.jobId]
          const jobMult = effect.multiplier

          jobInfo?.outputs.forEach((output) => {
            if (!output.multipliers) {
              output.multipliers = []
            }
            output.multipliers.push(jobMult)
          })
          break
        }
        case BuildingTypes.JobMultiplierInput: {
          const jobInfo = jobDefinitions[effect.jobId]
          const jobMult = effect.multiplier

          jobInfo?.inputs?.forEach((input) => {
            if (!input.multipliers) {
              input.multipliers = []
            }
            input.multipliers.push(jobMult)
          })
          break
        }
        case BuildingTypes.JobProducer: {
          const jobId = effect.jobId
          const addOpenJobs = effect.addOpenJobs
          if (building.count == 1) {
            jobSystem.createNewJob(jobId)
          }

          jobSystem.addJobSlots(jobId, addOpenJobs)
          break
        }
        case BuildingTypes.WorkerProducer: {
          const newWorkers = effect.addWorkers

          workerSystem.increaseMaxWorkerCount(newWorkers)
          break
        }
        case BuildingTypes.Unlocker:
          console.log(`BuildingSystem => triggerBuilding => unlocker: (change this) ${effect.type}`)
          break
        default:
          console.log('BuildingSystem => triggerBuilding default case triggered')
          break
      }
    })
  }
}
