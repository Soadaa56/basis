// src/game/data/initialGameState.ts
import type { Resource } from '@/game/models/Resource'
import type { Building } from '@/game/models/Buildings'

import { ResourceIds } from '@/game/models/Resource'
import { BuildingIds } from '@/game/models/Buildings'

export const initialResources: Resource[] = [
  {
    id: ResourceIds.Gold,
    name: 'Gold',
    currentAmount: 50,
    baseStorage: 1000,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 0,
    baseIncomeModifiers: [],
    calculatedIncome: 0,
    lastUpdated: Date.now(),
  },
  {
    id: ResourceIds.Food,
    name: 'Food',
    currentAmount: 10,
    baseStorage: 100,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 0,
    baseIncomeModifiers: [],
    calculatedIncome: 0,
    lastUpdated: Date.now(),
  },
  {
    id: ResourceIds.Wood,
    name: 'Wood',
    currentAmount: 0,
    baseStorage: 20,
    baseStorageModifiers: [],
    calculatedStorage: 20,
    baseIncome: 0,
    baseIncomeModifiers: [],
    calculatedIncome: 0,
    lastUpdated: Date.now(),
  },
]

export const initialBuildings: Building[] = [
  {
    id: BuildingIds.Farm,
    name: 'Farm',
    cost: [],
    count: 1,
  },
]
