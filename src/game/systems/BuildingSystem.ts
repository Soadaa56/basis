import { BuildingTypes } from '@/game/models/buildings/buildingsInfo'
import { JobSystem } from './JobSystem'
import { WorkerSystem } from './WorkerSystem'
import { ResourceSystem } from './ResourceSystem'
import { Building } from '@/game/models/Buildings'
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
          resourceSystem.ensureResourceExists(effect.resourceId)
          const resource = resourceSystem.getResourceById(effect.resourceId)
          const rate = effect.rate * building.count

          if (!resource) {
            throw new Error('building resourceProducer. resource should exist')
          }
          resource.incomeSources.buildings[building.definition.id] = rate
          break
        }
        case BuildingTypes.ResourceMultiplier: {
          resourceSystem.ensureResourceExists(effect.resourceId)
          const resource = resourceSystem.getResourceById(effect.resourceId)
          const totalMult = Math.pow(effect.multiplier, building.count)

          if (!resource) {
            throw new Error('building resourceProducer. resource should exist')
          }

          resource.IncomeMultipliers[building.definition.id] = totalMult
          break
        }

        case BuildingTypes.ResourceStorage: {
          const resource = resourceSystem.getResourceById(effect.resourceId)
          const buildingId = building.definition.id

          if (!resource) {
            console.error(`triggerBuilding error => resourceStorage Resource: ${effect.resourceId}`)
            return
          }

          if (effect.flatStorageAmount) {
            resource.baseStorageFlatBonus[buildingId] = effect.flatStorageAmount * building.count
          }
          if (effect.modifierStorageAmount) {
            resource.baseStorageModifiers[buildingId] = Math.pow(
              effect.modifierStorageAmount,
              building.count,
            )
          }
          resourceSystem.updateCalculatedStorage(resource)
          break
        }
        case BuildingTypes.JobOutputMult: {
          const job = jobSystem.getJobById(effect.jobId)
          const totalBuildingMult = building.count * effect.multiplier

          job.multipliers.push(totalBuildingMult)
          break
        }
        case BuildingTypes.JobProducer: {
          jobSystem.addJobSlots(effect.jobId, effect.addOpenJobs)
          break
        }
        case BuildingTypes.WorkerProducer: {
          workerSystem.increaseMaxWorkerCount(effect.addWorkers)
          break
        }
        // Might only need to tell systems (like research) to check if locked 'things' requirements are met
        // or should unlocks be it own system?
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
