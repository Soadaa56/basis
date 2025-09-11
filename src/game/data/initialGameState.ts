// src/game/data/initialGameState.ts
import type { Resource } from '@/game/models/Resource'
import type { Building } from '@/game/models/Buildings'

import { ResourceIds } from '@/game/models/Resource'
import { BuildingIds } from '@/game/models/Buildings'

export const initialResources: Resource[] = [
  {
    id: ResourceIds.Gold,
    name: 'Gold',
    currentAmount: 25,
    baseStorage: 500,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 0,
    baseIncomeModifiers: [],
    calculatedIncome: 0,
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
