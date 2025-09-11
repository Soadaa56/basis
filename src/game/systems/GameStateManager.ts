import { ResourceSystem } from '@/game/systems/ResourceSystem'
import { BuildingSystem } from '@/game/systems/BuildingSystem'
import { MagicSystem } from '@/game/systems/MagicSystem'
import { WorkerSystem } from '@/game/systems/WorkerSystem'

import type { Resource } from '@/game/models/Resource'
// import type { ResourceCost } from '@/game/models/Costs'
import type { Building } from '@/game/models/Buildings'
import type { Magic } from '@/game/models/Magic'

export interface GameState {
  resources: Resource[]
  buildings: Building[]
  magic: Magic[]
  workers: number
}

export class GameStateManager {
  gameState: GameState
  resourceSystem: ResourceSystem
  buildingSystem: BuildingSystem
  magicSystem: MagicSystem
  workerSystem: WorkerSystem

  constructor(gameState: GameState) {
    this.gameState = gameState
    this.resourceSystem = new ResourceSystem(gameState.resources)
    this.buildingSystem = new BuildingSystem(gameState.buildings)
    this.magicSystem = new MagicSystem(gameState.magic)
    this.workerSystem = new WorkerSystem(gameState.workers)
  }
}
