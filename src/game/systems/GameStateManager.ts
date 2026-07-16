import { reactive } from 'vue'
import { ResourceSystem } from '@/game/systems/ResourceSystem'
import { BuildingSystem } from '@/game/systems/BuildingSystem'
import { MagicSystem } from '@/game/systems/MagicSystem'
import { WorkerSystem } from '@/game/systems/WorkerSystem'
import { JobSystem } from './JobSystem'
import { TICK_INTERVAL } from '@/game/config/config'
import { ResearchSystem } from './ResearchSystem'
import type { Resource } from '@/game/models/Resource'
import type { Building } from '@/game/models/Buildings'
import type { BuildingId } from '@/game/data/buildingsId'
import type { Magic } from '@/game/models/Magic'
import type { Job, JobId } from '@/game/models/Jobs'
import type { WorkerState } from '@/game/systems/WorkerSystem'
import type { Research } from '../models/Research'

export interface GameState {
  resources: Resource[]
  buildings: Building[]
  magic: Magic[]
  jobs: Job[]
  workers: WorkerState
  research: Research[]
}

export class GameStateManager {
  gameState: GameState
  resourceSystem: ResourceSystem
  buildingSystem: BuildingSystem
  magicSystem: MagicSystem
  jobSystem: JobSystem
  workerSystem: WorkerSystem
  researchSystem: ResearchSystem
  private tickInterval: number = TICK_INTERVAL //ms

  constructor(gameState: GameState) {
    this.gameState = reactive(gameState)

    this.resourceSystem = new ResourceSystem(this.gameState.resources)
    this.buildingSystem = new BuildingSystem(this.gameState.buildings)
    this.magicSystem = new MagicSystem(this.gameState.magic)
    this.jobSystem = new JobSystem(this.gameState.jobs, this.resourceSystem)
    this.workerSystem = new WorkerSystem(this.jobSystem, this.gameState.workers)
    this.researchSystem = new ResearchSystem(
      this.gameState.research,
      this.buildingSystem,
      this.jobSystem,
      this.resourceSystem,
    )
  }

  getGameState(): GameState {
    return {
      resources: this.resourceSystem.getAllResources,
      buildings: this.buildingSystem.getAllBuildings,
      magic: this.magicSystem.getAllMagic,
      jobs: this.jobSystem.getAllJobs,
      workers: this.workerSystem.getAllWorkers(),
      research: this.researchSystem.getAllResearch,
    }
  }

  loadGameState(gameState: GameState): void {
    Object.assign(this.gameState, gameState)

    this.resourceSystem.loadResources(this.gameState.resources)
    this.buildingSystem.loadBuildings(this.gameState.buildings)
    this.magicSystem.loadMagic(this.gameState.magic)
    this.jobSystem.loadJobs(this.gameState.jobs)
    this.workerSystem.loadWorkers(this.gameState.workers)
    this.researchSystem.loadResearch(this.gameState.research)
  }

  startTick(tickInterval: number = this.tickInterval): void {
    setInterval(() => this.gameTick(), tickInterval)
  }

  gameTick(): void {
    this.resourceSystem.updateAllResources()
  }

  setTickInterval(tickInterval: number): void {
    this.tickInterval = tickInterval
  }

  purchaseBuilding(buildingId: BuildingId): void {
    const building = this.buildingSystem.getBuildingOrError(buildingId)
    const cost = building.getCurrentCost()

    if (!cost) return
    if (!this.resourceSystem.canAfford(cost)) return

    this.resourceSystem.spendResources(cost)
    building?.addBuildingCount()
    this.buildingSystem.triggerBuilding(
      building,
      this.resourceSystem,
      this.jobSystem,
      this.workerSystem,
    )
    // can be optimized by checking for only research containing unlockType Building
    this.researchSystem.checkLockedResearch()
  }

  purchaseResearch(research: Research): void {
    if (!this.resourceSystem.canAfford(research.cost)) {
      return
    }
    this.resourceSystem.spendResources(research.cost)

    this.researchSystem.triggerResearchEffect(research.id)
    this.researchSystem.completeResearch(research.id)
    this.researchSystem.checkLockedResearch()
  }

  addWorkerToJob(jobId: JobId): void {
    this.workerSystem.assignWorker(jobId)
    this.jobSystem.jobResourceContribution(jobId)
  }

  removeWorkerFromJob(jobId: JobId): void {
    this.workerSystem.unassignWorker(jobId)
    this.jobSystem.jobResourceContribution(jobId)
  }

  fillResources(): void {
    const resources = this.resourceSystem.getAllResources

    resources.forEach((resource) => {
      resource.currentAmount = resource.calculatedStorage
    })
  }
}
