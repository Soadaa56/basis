import type { GameState } from '@/game/systems/GameStateManager'
import type { ResourceId } from '@/game/models/Resource'
import type { JobId } from '@/game/models/Jobs'
import type { BuildingId } from '@/game/data/buildingsId'
import { ResearchStates, type ResearchState } from '@/game/models/researches/ResearchState'

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
    research: state.research.map((res) => ({
      ...res,
      state: res.state ?? ResearchStates.Locked,
    })),
  }
}

export interface SerializedGameState {
  resources: Array<{
    id: ResourceId
    name: string
    currentAmount: number
    baseStorage: number
    baseStorageFlatBonus: Record<string, number>
    baseStorageMults: Record<string, number>
    calculatedStorage: number
    baseIncome: number
    incomeSources: {
      jobs: Record<JobId, number>
      buildings: Record<string, number>
    }
    incomeMultipliers: Record<string, number>
    totalIncome: number
  }>

  buildings: Array<{
    definitionId: BuildingId
    count: number
  }>

  magic: any[]
  jobs: any[]
  workers: {
    unassignedWorkerCount: number
    maxWorkerCount: number
  }
  research: Array<{
    id: string
    state: ResearchState
  }>
}
