// src/game/data/initialGameState.ts
import type { Resource } from '../models/Resource'
import { ResourceIds } from '../models/Resource'

export const initialGameState: Resource[] = [
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
