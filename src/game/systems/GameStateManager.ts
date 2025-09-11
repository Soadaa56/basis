import type { Resource } from '@/game/models/Resource'
import type { Building } from '@/game/models/Buildings'

export interface GameState {
  resources: Resource[]
  buildings: Building[]
  workers: number
}

export class GameStateManager {}
