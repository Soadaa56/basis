import type { GameState } from '@/game/systems/GameStateManager'
import type { Resource } from '@/game/models/Resource'
import type { Job } from '@/game/models/Jobs'
import type { WorkerState } from '@/game/systems/WorkerSystem'

import { Building } from '@/game/models/Buildings'
import { ResourceIds } from '@/game/models/Resource'
import { JobIds } from '@/game/models/Jobs'
import { buildingDefinitions } from './buildings'

const initialResources: Resource[] = [
  {
    id: ResourceIds.Gold,
    name: 'Gold',
    currentAmount: 5,
    baseStorage: 500,
    baseStorageFlatBonus: {},
    baseStorageModifiers: {},
    calculatedStorage: 100,
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
    currentAmount: 20,
    baseStorage: 100,
    baseStorageFlatBonus: {},
    baseStorageModifiers: {},
    calculatedStorage: 100,
    baseIncome: 0,
    incomeSources: {
      jobs: {},
      buildings: {},
    },
    IncomeMultipliers: {},
    totalIncome: 0,
  },
  {
    id: ResourceIds.Wood,
    name: 'Wood',
    currentAmount: 0,
    baseStorage: 20,
    baseStorageFlatBonus: {},
    baseStorageModifiers: {},
    calculatedStorage: 20,
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
  new Building(buildingDefinitions.farm, 1, true),
  new Building(buildingDefinitions.hut, 1, true),
]

const initialJobs: Job[] = [
  {
    id: JobIds.Farmer,
    name: 'Farmer',
    totalJobs: 1,
    assignedWorkers: 0,
  },
  {
    id: JobIds.Beggar,
    name: 'Beggar',
    totalJobs: 1,
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
}
