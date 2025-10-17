import type { GameState } from '@/game/systems/GameStateManager'
import type { Resource } from '@/game/models/Resource'
import type { Building } from '@/game/models/Buildings'
import type { Job } from '@/game/models/Jobs'
import type { WorkerState } from '@/game/systems/WorkerSystem'

import { ResourceIds } from '@/game/models/Resource'
import { BuildingIds } from '@/game/models/Buildings'
import { JobIds } from '@/game/models/Jobs'
import { BuildingTypes } from '../models/buildings/buildingsInfo'

const initialResources: Resource[] = [
  {
    id: ResourceIds.Gold,
    name: 'Gold',
    currentAmount: 5,
    baseStorage: 500,
    baseStorageFlatBonus: [],
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 0,
    incomeSources: {
      jobs: 0,
      buildings: 0,
    },
    baseIncomeMultipliers: [],
    totalIncome: 0,
  },
  {
    id: ResourceIds.Food,
    name: 'Food',
    currentAmount: 20,
    baseStorage: 100,
    baseStorageFlatBonus: [],
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 0,
    incomeSources: {
      jobs: 0,
      buildings: 0,
    },
    baseIncomeMultipliers: [],
    totalIncome: 0,
  },
  {
    id: ResourceIds.Wood,
    name: 'Wood',
    currentAmount: 0,
    baseStorage: 20,
    baseStorageFlatBonus: [],
    baseStorageModifiers: [],
    calculatedStorage: 20,
    baseIncome: 0,
    incomeSources: {
      jobs: 0,
      buildings: 0,
    },
    baseIncomeMultipliers: [],
    totalIncome: 0,
  },
]

const initialBuildings: Building[] = [
  {
    id: BuildingIds.Hut,
    name: 'Hut',
    type: BuildingTypes.WorkerProducer,
    cost: [
      {
        resource: ResourceIds.Food,
        amount: 20,
      },
      {
        resource: ResourceIds.Gold,
        amount: 20,
      },
    ],
    count: 1,
    maxCount: 25,
    costMultiplier: 1.21,
    purchaseEffectText: '+1 worker',
    flavorText: 'Better than nothing',
  },
  {
    id: BuildingIds.Farm,
    name: 'Farm',
    type: BuildingTypes.JobProducer,
    cost: [
      {
        resource: ResourceIds.Food,
        amount: 50,
      },
    ],
    count: 1,
    maxCount: 10,
    costMultiplier: 1.4,
    purchaseEffectText: '+1 farmer job',
    flavorText: 'How do you expect one person to do all this work!?',
  },
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
