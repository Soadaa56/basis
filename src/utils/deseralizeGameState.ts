import { Building } from '@/game/models/Buildings'
import { buildingDefinitions } from '@/game/data/buildings'
import type { SerializedGameState } from './seralizeGameState'
import type { GameState } from '@/game/systems/GameStateManager'

export function deserializeGameState(data: SerializedGameState): GameState {
  return {
    ...data,
    buildings: data.buildings.map(
      (b) => new Building(buildingDefinitions[b.definitionId], b.count),
    ),
  }
}
