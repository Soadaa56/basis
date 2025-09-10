// src/game/data/initialGameState.ts
import type { Resource } from '../models/Resource'
import { ResourceIds } from '../models/Resource'

export const initialGameState: Resource[] = [
  {
    id: ResourceIds.Gold,
    name: 'Gold',
    currentAmount: 10,
    baseStorage: 100,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 1,
    baseIncomeModifiers: [],
    calculatedIncome: 1,
    lastUpdated: Date.now(),
  },
  {
    id: ResourceIds.Food,
    name: 'Food',
    currentAmount: 10,
    baseStorage: 100,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 1,
    baseIncomeModifiers: [],
    calculatedIncome: 1,
    lastUpdated: Date.now(),
  },
  {
    id: ResourceIds.Wood,
    name: 'Wood',
    currentAmount: 10,
    baseStorage: 100,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 1,
    baseIncomeModifiers: [],
    calculatedIncome: 1,
    lastUpdated: Date.now(),
  },
]
