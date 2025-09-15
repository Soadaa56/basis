import { ResourceSystem } from '@/game/systems/ResourceSystem'
import { BuildingSystem } from '@/game/systems/BuildingSystem'
import { MagicSystem } from '@/game/systems/MagicSystem'
import { WorkerSystem } from '@/game/systems/WorkerSystem'
import { JobSystem } from './JobSystem'

import type { Resource } from '@/game/models/Resource'
import type { ResourceCost } from '@/game/models/Costs'
import type { Building, BuildingId } from '@/game/models/Buildings'
import type { Magic } from '@/game/models/Magic'
import type { Job } from '@/game/models/Jobs'

export interface GameState {
  resources: Resource[]
  buildings: Building[]
  magic: Magic[]
  workers: number
  jobs: Job[]
}

export class GameStateManager {
  gameState: GameState
  resourceSystem: ResourceSystem
  buildingSystem: BuildingSystem
  magicSystem: MagicSystem
  workerSystem: WorkerSystem
  jobSystem: JobSystem

  constructor(gameState: GameState) {
    this.gameState = gameState
    this.resourceSystem = new ResourceSystem(gameState.resources)
    this.buildingSystem = new BuildingSystem(gameState.buildings)
    this.magicSystem = new MagicSystem(gameState.magic)
    this.workerSystem = new WorkerSystem(gameState.workers)
    this.jobSystem = new JobSystem()
  }

  purchaseBuilding(buildingId: BuildingId, buildingCosts: ResourceCost[]) {
    if (!this.resourceSystem.canAfford(buildingCosts)) return
    this.resourceSystem.spendResources(buildingCosts)
    this.buildingSystem.incrementBuilding(buildingId)
    this.buildingSystem.triggerBuilding(
      buildingId,
      this.resourceSystem,
      this.jobSystem,
      this.workerSystem,
    )
  }
}
