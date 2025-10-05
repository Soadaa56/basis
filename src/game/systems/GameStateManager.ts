import { ResourceSystem } from '@/game/systems/ResourceSystem'
import { BuildingSystem } from '@/game/systems/BuildingSystem'
import { MagicSystem } from '@/game/systems/MagicSystem'
import { WorkerSystem } from '@/game/systems/WorkerSystem'
import { JobSystem } from './JobSystem'
import { TICK_INTERVAL } from '@/game/config/config'

import type { Resource } from '@/game/models/Resource'
import type { ResourceCost } from '@/game/models/Costs'
import type { Building, BuildingId } from '@/game/models/Buildings'
import type { Magic } from '@/game/models/Magic'
import type { Job } from '@/game/models/Jobs'
import type { WorkerState } from '@/game/systems/WorkerSystem'
import { reactive } from 'vue'

export interface GameState {
  resources: Resource[]
  buildings: Building[]
  magic: Magic[]
  jobs: Job[]
  workers: WorkerState
}

export class GameStateManager {
  gameState: GameState
  resourceSystem: ResourceSystem
  buildingSystem: BuildingSystem
  magicSystem: MagicSystem
  jobSystem: JobSystem
  workerSystem: WorkerSystem
  private tickInterval: number = TICK_INTERVAL //ms

  constructor(gameState: GameState) {
    this.gameState = reactive(gameState)

    this.resourceSystem = new ResourceSystem(gameState.resources)
    this.buildingSystem = new BuildingSystem(gameState.buildings)
    this.magicSystem = new MagicSystem(gameState.magic)
    this.jobSystem = new JobSystem()
    this.workerSystem = new WorkerSystem(this.jobSystem, gameState.workers)
  }

  loadGameState(gameState: GameState) {
    this.gameState = gameState
    this.resourceSystem.loadResources(gameState.resources)
    this.buildingSystem.loadBuildings(gameState.buildings)
    this.magicSystem.loadMagic(gameState.magic)
    this.jobSystem.loadJobs(gameState.jobs)
    this.workerSystem.loadWorkers(gameState.workers)
  }

  startTick(tickInterval: number = this.tickInterval) {
    setInterval(() => this.gameTick(), tickInterval)
  }

  gameTick() {
    this.resourceSystem.updateAllResources()
  }

  setTickInterval(tickInterval: number) {
    this.tickInterval = tickInterval
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
