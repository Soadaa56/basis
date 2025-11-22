import type { GameState } from '@/game/systems/GameStateManager'

export function serializeGameState(state: GameState) {
  return {
    resources: state.resources.map((r) => ({ ...r })),
    buildings: state.buildings.map((b) => ({
      definitionId: b.definition.id,
      count: b.count,
    })),
    magic: state.magic.map((m) => ({ ...m })),
    jobs: state.jobs.map((j) => ({ ...j })),
    workers: { ...state.workers },
    research: state.research.map((r) => ({
      id: r.id,
      state: r.state,
    })),
  }
}
