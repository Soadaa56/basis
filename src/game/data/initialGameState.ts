import type { GameState } from '@/game/systems/GameStateManager'
import type { Resource } from '@/game/models/Resource'
import type { Job } from '@/game/models/Jobs'
import type { WorkerState } from '@/game/systems/WorkerSystem'
import { Building } from '@/game/models/Buildings'
import { ResourceIds } from '@/game/models/Resource'
import { JobIds } from '@/game/models/Jobs'
import { buildingDefinitions } from './buildings'
import { allResearch } from './researches/allResearch'
import { ResearchStates } from '../models/researches/ResearchState'

const initialResources: Resource[] = [
  {
    id: ResourceIds.Research,
    name: 'Research',
    currentAmount: 0,
    baseStorage: 100,
    baseStorageFlatBonus: {},
    baseStorageModifiers: {},
    calculatedStorage: 100,
    baseIncome: 1,
    incomeSources: {
      jobs: {},
      buildings: {},
    },
    IncomeMultipliers: {},
    totalIncome: 1,
  },
  {
    id: ResourceIds.Gold,
    name: 'Gold',
    currentAmount: 20,
    baseStorage: 200,
    baseStorageFlatBonus: {},
    baseStorageModifiers: {},
    calculatedStorage: 200,
    baseIncome: 0,
    incomeSources: {
      jobs: {},
      buildings: {},
    },
    IncomeMultipliers: {},
    totalIncome: 0,
  },
  {
    id: ResourceIds.Food,
    name: 'Food',
    currentAmount: 50,
    baseStorage: 100,
    baseStorageFlatBonus: {},
    baseStorageModifiers: {},
    calculatedStorage: 100,
    baseIncome: 1,
    incomeSources: {
      jobs: {},
      buildings: {},
    },
    IncomeMultipliers: {},
    totalIncome: 1,
  },
  {
    id: ResourceIds.Stone,
    name: 'Stone',
    currentAmount: 50,
    baseStorage: 200,
    baseStorageFlatBonus: {},
    baseStorageModifiers: {},
    calculatedStorage: 200,
    baseIncome: 0,
    incomeSources: {
      jobs: {},
      buildings: {},
    },
    IncomeMultipliers: {},
    totalIncome: 0,
  },
]

const initialBuildings: Building[] = [
  new Building(buildingDefinitions.hut, 1), // buildingDefinition, count = 0
  new Building(buildingDefinitions.loggingCamp, 0),
  new Building(buildingDefinitions.farm, 0),
]

const initialJobs: Job[] = [
  {
    id: JobIds.Gatherer,
    name: 'Gathrerer',
    totalJobs: Infinity,
    assignedWorkers: 0,
  },
  {
    id: JobIds.Farmer,
    name: 'Farmer',
    totalJobs: 0,
    assignedWorkers: 0,
  },
]

const initialWorkers: WorkerState = {
  unassignedWorkerCount: 1,
  maxWorkerCount: 1,
}

export const initialGameState: GameState = {
  resources: initialResources,
  buildings: initialBuildings,
  jobs: initialJobs,
  magic: [],
  workers: initialWorkers,
  research: allResearch.map((res) => ({
    ...res,
    state: res.state ?? ResearchStates.Locked,
  })),
}
