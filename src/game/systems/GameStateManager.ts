import { reactive } from 'vue'
import { ResourceSystem } from '@/game/systems/ResourceSystem'
import { BuildingSystem } from '@/game/systems/BuildingSystem'
import { MagicSystem } from '@/game/systems/MagicSystem'
import { WorkerSystem } from '@/game/systems/WorkerSystem'
import { JobSystem } from './JobSystem'
import { TICK_INTERVAL } from '@/game/config/config'

import type { Resource, ResourceId } from '@/game/models/Resource'
import type { Building } from '@/game/models/Buildings'
import type { BuildingId } from '@/game/data/buildingsId'
import type { Magic } from '@/game/models/Magic'
import type { Job, JobId } from '@/game/models/Jobs'
import type { WorkerState } from '@/game/systems/WorkerSystem'

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
    this.jobSystem = new JobSystem(gameState.jobs, this.resourceSystem)
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

  purchaseBuilding(buildingId: BuildingId) {
    const building = this.buildingSystem.getBuildingOrError(buildingId)
    const cost = building.getCurrentCost()

    if (!cost) return
    if (!this.resourceSystem.canAfford(cost)) return

    this.resourceSystem.spendResources(cost)
    building?.addBuildingCount()
    this.buildingSystem.triggerBuilding(building, this.resourceSystem, this.jobSystem, this.workerSystem)
  }

  addWorkerToJob(jobId: JobId) {
    this.workerSystem.assignWorker(jobId)
    this.jobSystem.jobResourceContribution(jobId)
  }

  removeWorkerFromJob(jobId: JobId) {
    this.workerSystem.unassignWorker(jobId)
    this.jobSystem.jobResourceContribution(jobId)
  }

  canAffordBuilding(buildingId: BuildingId): boolean {
    const building = this.buildingSystem.getBuildingOrError(buildingId)
    const cost = building.getCurrentCost()

    if (this.resourceSystem.canAfford(cost)) return true
    return false
  }

  canAffordBuildingWithCurrentStorage(buildingId: BuildingId): boolean {
    const building = this.buildingSystem.getBuildingOrError(buildingId)
    const cost = building.getCurrentCost()

    if (this.resourceSystem.canAffordWithCurrentStorage(cost)) return true
    return false
  }

  canAffordCostWithCurrentStorage(buildingId: BuildingId, resourceId: ResourceId): boolean {
    const building = this.buildingSystem.getBuildingOrError(buildingId)
    const resourceCost = building.getSingleResourceCostByResourceId(resourceId)
    const resource = this.resourceSystem.getResourceById(resourceId)

    if (!resource) {
      return false
    }

    return resource.currentAmount >= resourceCost
  }

  fillResources() {
    const resources = this.resourceSystem.getAllResources()

    resources.forEach((resource) => {
      resource.currentAmount = resource.calculatedStorage
    })
  }
}
