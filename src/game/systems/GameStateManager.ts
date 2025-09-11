import { newGameFile, saveGameFile, loadSaveFile } from '@/utils/saveFile'
import { ResourceSystem } from '@/game/systems/ResourceSystem'
import { BuildingSystem } from '@/game/systems/BuildingSystem'

import type { Resource } from '@/game/models/Resource'
import type { ResourceCost } from '@/game/models/Costs'
import type { Building } from '@/game/models/Buildings'
import type { Magic } from '@/game/models/Magic'

export interface GameState {
  resources: Resource[]
  buildings: Building[]
  workers: number
  magic: Magic[]
}

export class GameStateManager {}
