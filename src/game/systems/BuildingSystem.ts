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
    this.buildings = buildings.map(b => new Building(b.definition, b.count))
  }

  loadBuildings(buildings: Building[]) {
    const loaded = buildings.map(b => new Building(b.definition, b.count))
    this.buildings.splice(0, this.buildings.length, ...loaded)
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
          resourceSystem.updateBuildingIncome(
            effect.resourceId,
            effect.rate,
            building.definition.id,
            building.count,
          )
          break
        }
        case BuildingTypes.ResourceMultiplier: {
          resourceSystem.ensureResourceExists(effect.resourceId)
          resourceSystem.updateBuildingMult(
            effect.resourceId,
            effect.multiplier,
            building.definition.id,
            building.count,
          )
          break
        }

        case BuildingTypes.ResourceStorage: {
          resourceSystem.ensureResourceExists(effect.resourceId)
          resourceSystem.updateStorage(effect.resourceId, building.definition.id, building.count, {
            flat: effect.flatStorageAmount,
            mult: effect.modifierStorageAmount,
          })
          break
        }
        case BuildingTypes.JobOutputMult: {
          jobSystem.updateBuildingJobMult(
            effect.jobId,
            building.definition.id,
            effect.multiplier,
            building.count,
          )
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
