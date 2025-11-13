import { BuildingTypes } from '@/game/models/buildings/buildingsInfo'
import { JobSystem } from './JobSystem'
import { WorkerSystem } from './WorkerSystem'
import { ResourceSystem } from './ResourceSystem'
import { Building } from '@/game/models/Buildings'
import { jobDefinitions } from '../data/jobs'
import { buildingDefinitions } from '../data/buildings'
import type { BuildingId } from '../data/buildingsId'

export class BuildingSystem {
  private buildings: Building[] = []

  constructor(buildings: Building[]) {
    this.buildings = buildings
  }

  loadBuildings(buildings: Building[]) {
    this.buildings = buildings
  }

  public get getAllBuildings(): Building[] {
    return this.buildings
  }

  hasBuilding(buildingId: BuildingId): boolean {
    const building = this.getBuildingById(buildingId)
    return building ? true : false
  }

  getBuildingById(buildingId: BuildingId) {
    return this.buildings.find((building) => building.definition.id === buildingId)
  }

  getBuildingOrError(buildingId: BuildingId) {
    const building = this.buildings.find((building) => building.definition.id === buildingId)
    if (!building) {
      throw new Error(`BuildingSystem => getBuildingOrError on buildingId: ${buildingId}`)
    }
    return building
  }

  unlockBuilding(buildingId: BuildingId) {
    if (this.hasBuilding(buildingId)) {
      return
    }

    const newBuilding = new Building(buildingDefinitions[buildingId], 0)

    this.buildings.push(newBuilding)
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
          const resource = resourceSystem.ensureResourceExists(effect.resourceId)
          const buildingId = building.definition.id
          const rate = effect.rate * building.count

          if (!resource) return
          resource.incomeSources.buildings[buildingId] = rate
          break
        }
        case BuildingTypes.ResourceMultiplier: {
          const resource = resourceSystem.ensureResourceExists(effect.resourceId)
          const buildingId = building.definition.id
          const count = building.count
          const totalMult = Math.pow(effect.multiplier, count)

          if (!resource) return

          resource.IncomeMultipliers[buildingId] = totalMult
          break
        }

        case BuildingTypes.ResourceStorage: {
          const resource = resourceSystem.ensureResourceExists(effect.resourceId)
          const buildingId = building.definition.id

          if (!resource) {
            console.warn(`triggerBuilding error => resourceStorage Resource: ${effect.resourceId}`)
            return
          }

          if (effect.flatStorageAmount) {
            resource.baseStorageFlatBonus[buildingId] = effect.flatStorageAmount * building.count
          }
          if (effect.modifierStorageAmount) {
            resource.baseStorageModifiers[buildingId] = Math.pow(effect.modifierStorageAmount, building.count)
          }
          resourceSystem.updateCalculatedStorage(resource)
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

            const jobInfo = jobSystem.getJobInfoOrError(jobId)
            const resourceOutputs = jobInfo.outputs.map((output) => output.resourceId)
            const resourceInputs = jobInfo.inputs?.map((input) => input.resourceId) ?? []

            for (const resourceId of [...resourceOutputs, ...resourceInputs]) {
              resourceSystem.ensureResourceExists(resourceId)
            }
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
